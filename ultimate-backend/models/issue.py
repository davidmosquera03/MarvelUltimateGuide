from datetime import date
from pydantic import BaseModel, HttpUrl,Field
from typing import List

class CreatorItem(BaseModel):
    name: str
    role: str

class IssueModel(BaseModel):
    id: str = Field(alias="_id")
    title: str
    issue_number: int
    series_id: str
    release_date: date
    cover: HttpUrl
    description: str
    creators: List[CreatorItem]

class SeriesPageIssue(BaseModel):
    issue_id: str
    title: str
    cover: HttpUrl
    description:str
    release_date: date
    

