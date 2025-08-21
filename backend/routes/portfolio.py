from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime

from models.database import (
    Profile, ProfileUpdate,
    Project, ProjectCreate, ProjectUpdate,
    Skill, SkillCreate, SkillUpdate,
    Testimonial, TestimonialCreate, TestimonialUpdate,
    Service, ServiceCreate, ServiceUpdate,
    Message, MessageCreate, MessageStatusUpdate
)
from database import get_database

router = APIRouter()

# Profile endpoints
@router.get("/profile", response_model=Profile)
async def get_profile(db: AsyncIOMotorDatabase = Depends(get_database)):
    profile = await db.profile.find_one()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("/profile", response_model=Profile)
async def update_profile(profile_update: ProfileUpdate, db: AsyncIOMotorDatabase = Depends(get_database)):
    update_data = {k: v for k, v in profile_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.profile.update_one(
        {},
        {"$set": update_data},
        upsert=True
    )
    
    profile = await db.profile.find_one()
    return profile

# Project endpoints
@router.get("/projects", response_model=List[Project])
async def get_projects(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    filter_query = {"published": True}
    
    if category:
        filter_query["category"] = category
    if featured is not None:
        filter_query["featured"] = featured
    
    projects = await db.projects.find(filter_query).sort("year", -1).to_list(100)
    return projects

@router.get("/projects/featured", response_model=List[Project])
async def get_featured_projects(db: AsyncIOMotorDatabase = Depends(get_database)):
    projects = await db.projects.find({"published": True, "featured": True}).sort("year", -1).to_list(10)
    return projects

@router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    project = await db.projects.find_one({"_id": ObjectId(project_id), "published": True})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    project_dict = project.dict()
    project_dict["created_at"] = datetime.utcnow()
    project_dict["updated_at"] = datetime.utcnow()
    
    result = await db.projects.insert_one(project_dict)
    created_project = await db.projects.find_one({"_id": result.inserted_id})
    return created_project

@router.put("/projects/{project_id}", response_model=Project)
async def update_project(
    project_id: str, 
    project_update: ProjectUpdate, 
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    update_data = {k: v for k, v in project_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.projects.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    
    updated_project = await db.projects.find_one({"_id": ObjectId(project_id)})
    return updated_project

@router.delete("/projects/{project_id}")
async def delete_project(project_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    result = await db.projects.delete_one({"_id": ObjectId(project_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return {"message": "Project deleted successfully"}

# Skills endpoints
@router.get("/skills", response_model=List[Skill])
async def get_skills(db: AsyncIOMotorDatabase = Depends(get_database)):
    skills = await db.skills.find({"published": True}).sort("order", 1).to_list(100)
    return skills

@router.post("/skills", response_model=Skill)
async def create_skill(skill: SkillCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    skill_dict = skill.dict()
    skill_dict["created_at"] = datetime.utcnow()
    skill_dict["updated_at"] = datetime.utcnow()
    
    result = await db.skills.insert_one(skill_dict)
    created_skill = await db.skills.find_one({"_id": result.inserted_id})
    return created_skill

@router.put("/skills/{skill_id}", response_model=Skill)
async def update_skill(
    skill_id: str, 
    skill_update: SkillUpdate, 
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid skill ID")
    
    update_data = {k: v for k, v in skill_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.skills.update_one(
        {"_id": ObjectId(skill_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    updated_skill = await db.skills.find_one({"_id": ObjectId(skill_id)})
    return updated_skill

@router.delete("/skills/{skill_id}")
async def delete_skill(skill_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid skill ID")
    
    result = await db.skills.delete_one({"_id": ObjectId(skill_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    return {"message": "Skill deleted successfully"}

# Testimonials endpoints
@router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(
    featured: Optional[bool] = None,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    filter_query = {"published": True}
    if featured is not None:
        filter_query["featured"] = featured
    
    testimonials = await db.testimonials.find(filter_query).sort("created_at", -1).to_list(100)
    return testimonials

@router.get("/testimonials/featured", response_model=List[Testimonial])
async def get_featured_testimonials(db: AsyncIOMotorDatabase = Depends(get_database)):
    testimonials = await db.testimonials.find({"published": True, "featured": True}).sort("created_at", -1).to_list(10)
    return testimonials

@router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    testimonial_dict = testimonial.dict()
    testimonial_dict["created_at"] = datetime.utcnow()
    testimonial_dict["updated_at"] = datetime.utcnow()
    
    result = await db.testimonials.insert_one(testimonial_dict)
    created_testimonial = await db.testimonials.find_one({"_id": result.inserted_id})
    return created_testimonial

@router.put("/testimonials/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(
    testimonial_id: str, 
    testimonial_update: TestimonialUpdate, 
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    if not ObjectId.is_valid(testimonial_id):
        raise HTTPException(status_code=400, detail="Invalid testimonial ID")
    
    update_data = {k: v for k, v in testimonial_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.testimonials.update_one(
        {"_id": ObjectId(testimonial_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    updated_testimonial = await db.testimonials.find_one({"_id": ObjectId(testimonial_id)})
    return updated_testimonial

@router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    if not ObjectId.is_valid(testimonial_id):
        raise HTTPException(status_code=400, detail="Invalid testimonial ID")
    
    result = await db.testimonials.delete_one({"_id": ObjectId(testimonial_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    return {"message": "Testimonial deleted successfully"}

# Services endpoints
@router.get("/services", response_model=List[Service])
async def get_services(db: AsyncIOMotorDatabase = Depends(get_database)):
    services = await db.services.find({"published": True}).sort("order", 1).to_list(100)
    return services

@router.post("/services", response_model=Service)
async def create_service(service: ServiceCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    service_dict = service.dict()
    service_dict["created_at"] = datetime.utcnow()
    service_dict["updated_at"] = datetime.utcnow()
    
    result = await db.services.insert_one(service_dict)
    created_service = await db.services.find_one({"_id": result.inserted_id})
    return created_service

@router.put("/services/{service_id}", response_model=Service)
async def update_service(
    service_id: str, 
    service_update: ServiceUpdate, 
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    if not ObjectId.is_valid(service_id):
        raise HTTPException(status_code=400, detail="Invalid service ID")
    
    update_data = {k: v for k, v in service_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.services.update_one(
        {"_id": ObjectId(service_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    
    updated_service = await db.services.find_one({"_id": ObjectId(service_id)})
    return updated_service

@router.delete("/services/{service_id}")
async def delete_service(service_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    if not ObjectId.is_valid(service_id):
        raise HTTPException(status_code=400, detail="Invalid service ID")
    
    result = await db.services.delete_one({"_id": ObjectId(service_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    
    return {"message": "Service deleted successfully"}

# Contact/Messages endpoints
@router.post("/contact", response_model=dict)
async def send_message(message: MessageCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    message_dict = message.dict()
    message_dict["status"] = "new"
    message_dict["created_at"] = datetime.utcnow()
    message_dict["updated_at"] = datetime.utcnow()
    
    result = await db.messages.insert_one(message_dict)
    return {"message": "Message sent successfully", "id": str(result.inserted_id)}

@router.get("/messages", response_model=List[Message])
async def get_messages(
    status: Optional[str] = None,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    filter_query = {}
    if status:
        filter_query["status"] = status
    
    messages = await db.messages.find(filter_query).sort("created_at", -1).to_list(100)
    return messages

@router.put("/messages/{message_id}/status")
async def update_message_status(
    message_id: str, 
    status_update: MessageStatusUpdate, 
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    if not ObjectId.is_valid(message_id):
        raise HTTPException(status_code=400, detail="Invalid message ID")
    
    result = await db.messages.update_one(
        {"_id": ObjectId(message_id)},
        {
            "$set": {
                "status": status_update.status,
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return {"message": "Message status updated successfully"}

@router.delete("/messages/{message_id}")
async def delete_message(message_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    if not ObjectId.is_valid(message_id):
        raise HTTPException(status_code=400, detail="Invalid message ID")
    
    result = await db.messages.delete_one({"_id": ObjectId(message_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return {"message": "Message deleted successfully"}