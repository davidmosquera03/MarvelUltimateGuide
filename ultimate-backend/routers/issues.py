from fastapi import APIRouter, HTTPException, Query
from database import ultimate_db
from models.issue import IssueModel,CreatorItem
from models.week import WeekItem
from typing import Optional,List
from datetime import datetime
router = APIRouter()

# get issue
@router.get("/from-series/{series_id}",tags=["Issues"])
async def get_issues_from_series(series_id:str):
    """
    returns all issues from a ceertain series
    """
    collection = ultimate_db[f"issues"]
    documents = await collection.find({"series_id":series_id}).sort("issue_number",1).to_list(length=None)
    documents = [IssueModel(**doc) for doc in documents]

    if not documents:
        raise HTTPException(status_code=404, detail=f"No issues found for series ID '{series_id}'")
    return {"issues":documents}

@router.get("/overview/{series_id}/", tags=["Issues"])
async def get_issues_overview(
    series_id: str,
    page: int = Query(1, ge=1, description="Page number for pagination (starts at 1)"),
    page_size: int = Query(10, ge=1, le=100, description="Number of items per page (max 100)")
):
    """
    Returns minimal issue info from series with pagination.
    """
    skip_count = (page - 1) * page_size
    
    collection = ultimate_db[f"issues"]
    documents = await collection.find({"series_id": series_id}) \
                               .sort("issue_number", 1) \
                               .skip(skip_count) \
                               .limit(page_size) \
                               .to_list(length=None) 
                               
    documents = [WeekItem(**doc) for doc in documents]

    if not documents:
        raise HTTPException(status_code=404, detail=f"No issues found for series ID '{series_id}' on page {page}")
    
    return {"issues": documents}

@router.get("/by-id/{issue_id}",tags=["Issues"])
async def get_issue(issue_id:str):
    """
    gets issue by id
    Ex: USM-14
    """
    collection = ultimate_db["issues"]
    one_doc = await collection.find_one({"_id":issue_id})
    one_doc = IssueModel(**one_doc)
    if not one_doc:
       raise HTTPException(404, "Issue not found")
    return {"issue":one_doc}

@router.get("/next-issue/{series_id}",tags=["Issues"])
async def get_next_issue_to_release(series_id: str):
   collection = ultimate_db["issues"]
   today = datetime.now().strftime("%Y-%m-%d")
   
   next_issue = await collection.find_one(
       {
           "series_id": series_id,
           "release_date": {"$gt": today}
       },
       sort=[("release_date", 1)]
   )
   
   if not next_issue:
       raise HTTPException(404, "No future issues found")
   return {"issue": IssueModel(**next_issue)}

@router.get("/furthest-issue/{series_id}",tags=["Issues"])
async def get_furthest_issue(series_id: str):
   collection = ultimate_db["issues"]
   
   furthest_issue = await collection.find_one(
       {"series_id": series_id},
       sort=[("issue_number", -1)]
   )
   
   if not furthest_issue:
       raise HTTPException(404, "No issues found")
   return {"issue": IssueModel(**furthest_issue)}

