# models.py

from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    
    despesas = relationship("Despesa", back_populates="user")
    rendimentos = relationship("Rendimento", back_populates="user")
    assinaturas = relationship("Assinatura", back_populates="usuario")

class Assinatura(Base):
    __tablename__ = "assinaturas"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    valor = Column(Float, nullable=False)
    status = Column(String, default="ativa")
    data_inicio = Column(Date, nullable=False) 
    data_renovacao = Column(Date, nullable=False)
    tipo = Column(String, nullable=False)
    
    usuario = relationship("User", back_populates="assinaturas")

class Despesa(Base):
    __tablename__ = "despesas"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    category = Column(String)
    description = Column(String, nullable=True)
    date = Column(Date)

    user = relationship("User", back_populates="despesas")


class Rendimento(Base):
    __tablename__ = "rendimentos"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    category = Column(String)
    description = Column(String, nullable=True)
    date = Column(Date)

    user = relationship("User", back_populates="rendimentos")
