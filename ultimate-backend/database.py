from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
# MongoDB connection
#load_dotenv()
#MONGODB_URL = os.getenv("MONGO_URI")
#print(f"MONGO_URI: {os.getenv('MONGO_URI')}") # check connection
MONGODB_URL = "mongodb://localhost:27017" # local
client = AsyncIOMotorClient(MONGODB_URL)
ultimate_db = client["Ultimate"]