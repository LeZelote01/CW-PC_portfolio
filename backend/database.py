from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pathlib import Path
from dotenv import load_dotenv
import os
import logging

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
database_name = os.environ.get('DB_NAME', 'portfolio_db')

client = AsyncIOMotorClient(mongo_url)
database = client[database_name]

async def get_database() -> AsyncIOMotorDatabase:
    return database

async def init_database():
    """Initialize database with indexes and collections"""
    try:
        # Create indexes for better performance
        await database.projects.create_index("category")
        await database.projects.create_index("year")
        await database.projects.create_index("featured")
        await database.projects.create_index("published")
        
        await database.skills.create_index("category")
        await database.skills.create_index("order")
        await database.skills.create_index("published")
        
        await database.testimonials.create_index("featured")
        await database.testimonials.create_index("published")
        
        await database.services.create_index("order")
        await database.services.create_index("published")
        
        await database.messages.create_index("status")
        await database.messages.create_index("created_at")
        
        logger.info("Database indexes created successfully")
        
    except Exception as e:
        logger.error(f"Error initializing database: {e}")

async def close_database():
    """Close database connection"""
    client.close()