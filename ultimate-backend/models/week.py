from pydantic import BaseModel, HttpUrl, Field, AliasChoices
from typing import List

class WeekItem(BaseModel):
    issue_id: str = Field(alias=AliasChoices("_id", "issue_id"))
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
