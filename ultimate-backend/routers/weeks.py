from fastapi import APIRouter,Query, HTTPException
from database import ultimate_db
from models.week import WeekItem,WeekModel
from typing import Optional,List
from datetime import datetime,date
router = APIRouter()

@router.get("/",tags=["Weeks"])
async def get_weeks():
    """
    returns all week documents
    """
    collection = ultimate_db["weeks"]
    documents = await collection.find().sort("week_no",1).to_list(length=100)

    if not documents:
        raise HTTPException(404, "No weeks found")
    validated = [WeekModel(**doc) for doc in documents]
    return {"weeks": validated}

@router.get("/by-id/{week_id}",tags=["Weeks"])
async def get_week_by_id(week_id:str):
    """
    returns a week by its id
    Ex: 29_2025
    """
    collection  = ultimate_db["weeks"]
    one_doc = await collection.find_one({"_id":week_id})
    if not one_doc:
        raise HTTPException(404, f"No week with id {week_id} found")
    one_doc = WeekModel(**one_doc)
    return {"week":one_doc}

@router.get("/current",tags=["Weeks"])
async def get_current_week():
    """
    returns a week by week number (week_no) and year (year)
    """
    year = int(datetime.now().year)
    current_week  = int(date.today().isocalendar()[1])
    print(current_week)
    collection  = ultimate_db["weeks"]
    one_doc = await collection.find_one({"week_no": current_week,"year":year})
    if not one_doc:
        raise HTTPException(404, f"Current Week not found")
    one_doc = WeekModel(**one_doc)
    return {"week":one_doc}

@router.get("/next",tags=["Weeks"])
async def get_next_week():
    """
    returns next week releases
    """
    year = year = int(datetime.now().year)
    next_week  = int(date.today().isocalendar()[1]+1)
    print(next_week)
    collection  = ultimate_db["weeks"]
    one_doc = await collection.find_one({"week_no": next_week,"year":year})
    if not one_doc:
        raise HTTPException(404, f"Next Week not found")
    one_doc = WeekModel(**one_doc)
    return {"week":one_doc}

@router.get("/range/{start_week}/{end_week}", tags=["Weeks"])
async def get_weeks_range(start_week: int, end_week: int):
   """
   Returns weeks in inclusive range (start_week to end_week)
   """
   collection = ultimate_db["weeks"]
   docs = await collection.find({
       "week_no": {"$gte": start_week, "$lte": end_week}
   }).sort("week_no",1).to_list(length=100)
   if not docs:
        raise HTTPException(404, f"Weeks in range [{start_week},{end_week}] not found")
   validated = [WeekModel(**doc) for doc in docs]
   return {"weeks": validated}

@router.get("/filter",tags=["Weeks"])
async def filter_weeks(titles: Optional[List[str]] = Query(None)):
    collection = ultimate_db["weeks"]
    documents = await collection.find().sort("week_no",1).to_list(length=100)
    if not documents:
        raise HTTPException(404, f"No weeks found to filter")
    if titles:
        filtered = []
        for week in documents:
            matched_comics = [
                comic for comic in week["data"]
                if any(title.lower() in comic["title"].lower() for title in titles)
            ]
            if matched_comics:
                filtered.append({**week, "data": matched_comics})
        return {"weeks":[WeekModel(**doc) for doc in filtered]}
    return {"weeks:":[WeekModel(**doc) for doc in documents]}

@router.get("/from-current", tags=["Weeks"])
async def get_weeks_from_current():
   """
   Returns weeks starting on current week
   """
   start_week  = int(date.today().isocalendar()[1])
   collection = ultimate_db["weeks"]
   docs = await collection.find({
       "week_no": {"$gte": start_week}
   }).sort("week_no",1).to_list(length=100)
   if not docs:
        raise HTTPException(404, f"Weeks not found")
   validated = [WeekModel(**doc) for doc in docs]
   return {"weeks": validated}
