from fastapi import FastAPI
from routes import users
from database import engine, Base
Base.metadata.create_all(bind=engine)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Simples com FastAPI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos os domínios. Substitua pelo seu domínio para mais segurança.
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

app.include_router(users.router)