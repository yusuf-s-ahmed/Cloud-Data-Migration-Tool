from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the request model
class MigrationRequest(BaseModel):
    mysql_conn: str
    mongo_conn: str
    mysql_table: str
    mongo_collection: str

@app.post("/migrate/")
async def migrate(request: MigrationRequest):
    logger.info(f"Received request: {request}")
    # Your migration logic here
    return {"message": "Migration completed successfully."}
