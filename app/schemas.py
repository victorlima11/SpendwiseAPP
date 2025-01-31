from pydantic import BaseModel, EmailStr

class User_Create(BaseModel):
    name: str
    email: EmailStr

class User_Response(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True