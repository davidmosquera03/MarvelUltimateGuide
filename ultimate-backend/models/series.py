from datetime import date
from pydantic import BaseModel, HttpUrl, Field
from typing import List, Optional

class SeriesModel(BaseModel):
    id: str = Field(alias="_id")
    title:str
    logo: Optional[HttpUrl] = None
    banner: Optional[HttpUrl] = None