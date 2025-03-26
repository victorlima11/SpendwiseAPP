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

class Assinatura_Create(BaseModel):
    user_id: int
    valor: float
    tipo: str
    data_inicio: date
    data_renovacao: date
    status: str = "ativa"

class Assinatura_Response(BaseModel):
    id: int
    user_id: int
    valor: float
    tipo: str
    data_inicio: date
    data_renovacao: date
    status: str

    class Config:
        from_attributes = True

class Assinatura_Update(BaseModel):
    status: Optional[str]
    tipo: Optional[str]
    valor: Optional[float]
    data_renovacao: Optional[date] 
