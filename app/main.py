from fastapi import FastAPI
from app.routes import users, hello
from app.database import engine, Base
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Simples com FastAPI")

app.include_router(users.router)
app.include_router(hello.router)