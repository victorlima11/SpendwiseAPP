from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class User_Create(BaseModel):
    name: str
    email: EmailStr
    password: str

class User_Response(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True

class User_Login(BaseModel):
    email: EmailStr
    password: str

class Despesa_Create(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None
    date: date 

class Rendimento_Create(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None
    date: date

class Despesa_Response(BaseModel):
    id: int
    user_id: int
    amount: float
    category: str
    description: Optional[str]
    date: date 

    class Config:
        from_attributes = True 

class Rendimento_Response(BaseModel):
    id: int
    user_id: int
    amount: float
    category: str
    description: Optional[str]
    date: date

    class Config:
        from_attributes = True 
