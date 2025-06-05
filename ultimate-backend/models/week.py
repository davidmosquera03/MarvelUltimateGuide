from pydantic import BaseModel, HttpUrl
from typing import List

class WeekItem(BaseModel):
    issue_id:str
    title: str
    cover: HttpUrl

class WeekModel(BaseModel):
    _id: str
    week_no: int
    year: int
    range: str
    date_start: str
    date_end: str
    data: List[WeekItem]
