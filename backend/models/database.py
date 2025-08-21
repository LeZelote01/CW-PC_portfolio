from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler):
        from pydantic_core import core_schema
        return core_schema.no_info_plain_validator_function(cls.validate)

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, schema, handler):
        json_schema = handler(schema)
        json_schema.update(type="string")
        return json_schema

# Base Model with common fields
class BaseDBModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Profile Models
class MultilingualText(BaseModel):
    fr: str
    en: str

class Profile(BaseDBModel):
    first_name: str
    last_name: str
    title: MultilingualText
    bio: MultilingualText
    email: str
    phone: str
    location: str
    website: str
    avatar: str
    years_experience: int
    projects_completed: int
    happy_clients: int

class ProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    title: Optional[MultilingualText] = None
    bio: Optional[MultilingualText] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    avatar: Optional[str] = None
    years_experience: Optional[int] = None
    projects_completed: Optional[int] = None
    happy_clients: Optional[int] = None

# Project Models
class Project(BaseDBModel):
    title: MultilingualText
    description: MultilingualText
    category: str
    client: str
    duration: str
    year: int
    image: str
    tags: List[str]
    results: MultilingualText
    featured: bool = False
    published: bool = True

class ProjectCreate(BaseModel):
    title: MultilingualText
    description: MultilingualText
    category: str
    client: str
    duration: str
    year: int
    image: str
    tags: List[str]
    results: MultilingualText
    featured: bool = False
    published: bool = True

class ProjectUpdate(BaseModel):
    title: Optional[MultilingualText] = None
    description: Optional[MultilingualText] = None
    category: Optional[str] = None
    client: Optional[str] = None
    duration: Optional[str] = None
    year: Optional[int] = None
    image: Optional[str] = None
    tags: Optional[List[str]] = None
    results: Optional[MultilingualText] = None
    featured: Optional[bool] = None
    published: Optional[bool] = None

# Skill Models
class Skill(BaseDBModel):
    name: str
    category: str
    level: int
    description: MultilingualText
    order: int = 1
    published: bool = True

class SkillCreate(BaseModel):
    name: str
    category: str
    level: int
    description: MultilingualText
    order: int = 1
    published: bool = True

class SkillUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    level: Optional[int] = None
    description: Optional[MultilingualText] = None
    order: Optional[int] = None
    published: Optional[bool] = None

# Testimonial Models
class Testimonial(BaseDBModel):
    name: str
    position: str
    company: str
    rating: int
    comment: MultilingualText
    image: str
    featured: bool = False
    published: bool = True

class TestimonialCreate(BaseModel):
    name: str
    position: str
    company: str
    rating: int
    comment: MultilingualText
    image: str
    featured: bool = False
    published: bool = True

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    position: Optional[str] = None
    company: Optional[str] = None
    rating: Optional[int] = None
    comment: Optional[MultilingualText] = None
    image: Optional[str] = None
    featured: Optional[bool] = None
    published: Optional[bool] = None

# Service Models
class MultilingualList(BaseModel):
    fr: List[str]
    en: List[str]

class Service(BaseDBModel):
    name: MultilingualText
    description: MultilingualText
    icon: str
    price: str
    features: MultilingualList
    order: int = 1
    published: bool = True

class ServiceCreate(BaseModel):
    name: MultilingualText
    description: MultilingualText
    icon: str
    price: str
    features: MultilingualList
    order: int = 1
    published: bool = True

class ServiceUpdate(BaseModel):
    name: Optional[MultilingualText] = None
    description: Optional[MultilingualText] = None
    icon: Optional[str] = None
    price: Optional[str] = None
    features: Optional[MultilingualList] = None
    order: Optional[int] = None
    published: Optional[bool] = None

# Message Models
class Message(BaseDBModel):
    name: str
    email: str
    subject: str
    message: str
    status: str = "new"  # new, read, replied

class MessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class MessageStatusUpdate(BaseModel):
    status: str