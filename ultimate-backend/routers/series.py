from fastapi import APIRouter, HTTPException
from database import ultimate_db
from models.issue import SeriesPageIssue
from models.week import WeekItem
from models.series import SeriesModel
from models.issue import IssueModel
from typing import Optional,List
from datetime import datetime
import asyncio
router = APIRouter()

@router.get("/",tags=["Series"])
async def get_all_series():
    collection = ultimate_db["series"]
    documents = await collection.find().to_list(length=100)

    if not documents:
        raise HTTPException(404, "No weeks found")
    validated = [SeriesModel(**doc) for doc in documents]
    return validated


@router.get("/series-title/{series_id}",tags=["Series"])
async def get_series_title(series_id:str):
    collection = ultimate_db["series"]
    one_doc = await collection.find_one({"_id":series_id})
    one_doc = SeriesModel(**one_doc)
    return {"title":one_doc.title}

@router.get("/length/{series_id}",tags=["Series"])
async def get_series_length(series_id:str):
    collection = ultimate_db["issues"]
    documents = await collection.find({"series_id":series_id}).sort("issue_number",1).to_list(length=None)
    documents = [IssueModel(**doc) for doc in documents]
    return {len(documents)}

@router.get("/{series_id}",tags=["Series"])
async def get_series(series_id:str):
    collection = ultimate_db["series"]
    one_doc = await collection.find_one({"_id":series_id})
    one_doc = SeriesModel(**one_doc)
    return one_doc

@router.get("/get-issues/{series_id}", tags=["Series"])
async def get_series_issues(series_id: str):
    collection = ultimate_db["issues"]
    today = datetime.now().strftime("%Y-%m-%d")

    first_task = collection.find_one({"_id": f"{series_id}-1"})
    next_task = collection.find_one(
        {"series_id": series_id, "release_date": {"$gt": today}},
        sort=[("release_date", 1)]
    )
    furthest_task = collection.find_one(
        {"series_id": series_id},
        sort=[("issue_number", -1)]
    )

    first_doc, next_doc, furthest_doc = await asyncio.gather(
        first_task, next_task, furthest_task
    )

    if not first_doc:
        raise HTTPException(status_code=404, detail="First issue not found")

    def format_issue(doc):
        return SeriesPageIssue(
            issue_id=doc["_id"],
            title=doc["title"],
            cover=doc["cover"],
            description=doc["description"],
            release_date=doc["release_date"]
        )

    return {
        "first_issue": format_issue(first_doc),
        "next_issue": format_issue(next_doc),
        "furthest_issue": format_issue(furthest_doc)
    }
