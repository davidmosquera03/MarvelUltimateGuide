from fastapi import FastAPI
from datetime import datetime
from routers import weeks,issues,series
from database import ultimate_db
from models.series import SeriesModel
from models.issue import IssueModel
from fastapi.middleware.cors import CORSMiddleware
import asyncio

app = FastAPI()
app.include_router(weeks.router, prefix="/weeks")
app.include_router(issues.router,prefix="/issues")
app.include_router(series.router,prefix="/series")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",    # React default port
        "http://localhost:5173",    # Vite default port
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)




    