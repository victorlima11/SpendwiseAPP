from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
from utils.hash import hash_password, verify_password
from utils.auth import create_access_token, verify_token
from datetime import timedelta
from utils.dependecies import get_current_user
from fastapi.security import OAuth2PasswordBearer


router = APIRouter(prefix="/users", tags=["users"])

@router.post("/register/", response_model=schemas.User_Response)
def register_user(user: schemas.User_Create, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado!")
    
    hashed_password = hash_password(user.password)
    new_user = models.User(name=user.name, email=user.email, password_hash=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post("/login/")
def login(user: schemas.User_Login, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=400, detail="Credenciais inválidas")

    access_token = create_access_token(data={"sub": db_user.email}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/", response_model=list[schemas.User_Response])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@router.get("/{user_id}", response_model=schemas.User_Response)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="Não foi possível encontrar esse usuário!")
    
    return user

@router.get("/me/")
def get_profile(user: dict = Depends(get_current_user)):
    return {"message": f"Bem-vindo, {user['sub']}!"}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

@router.get("/despesas/", response_model=list[schemas.Despesa_Response])
def get_despesas(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    # Decodifique o token e obtenha o e-mail do usuário autenticado
    user = verify_token(token)  # Função para decodificar o token e obter os dados do usuário
    db_user = db.query(models.User).filter(models.User.email == user['sub']).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    despesas = db.query(models.Despesa).filter(models.Despesa.user_id == db_user.id).all()
    return despesas

@router.get("/rendimentos/", response_model=list[schemas.Rendimento_Response])
def get_rendimentos(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    # Decodifique o token e obtenha o e-mail do usuário autenticado
    user = verify_token(token)  # Função para decodificar o token e obter os dados do usuário
    db_user = db.query(models.User).filter(models.User.email == user['sub']).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    rendimentos = db.query(models.Rendimento).filter(models.Rendimento.user_id == db_user.id).all()
    return rendimentos

@router.post("/despesas/", response_model=schemas.Despesa_Response)
def add_despesa(despesa: schemas.Despesa_Create, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = verify_token(token)  # Decodifica o token para pegar o e-mail do usuário
    db_user = db.query(models.User).filter(models.User.email == user['sub']).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    new_despesa = models.Despesa(
        user_id=db_user.id,
        amount=despesa.amount,
        category=despesa.category,
        description=despesa.description,
        date=despesa.date
    )

    db.add(new_despesa)
    db.commit()
    db.refresh(new_despesa)

    return new_despesa

@router.post("/rendimentos/", response_model=schemas.Rendimento_Response)
def add_rendimento(rendimento: schemas.Rendimento_Create, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = verify_token(token)  # Decodifica o token para pegar o e-mail do usuário
    db_user = db.query(models.User).filter(models.User.email == user['sub']).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    new_rendimento = models.Rendimento(
        user_id=db_user.id,
        amount=rendimento.amount,
        category=rendimento.category,
        description=rendimento.description,
        date=rendimento.date
    )

    db.add(new_rendimento)
    db.commit()
    db.refresh(new_rendimento)

    return new_rendimento

@router.get("/despesas/", response_model=list[schemas.Despesa_Response])
def get_despesas(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = verify_token(token)  # Decodifica o token para pegar o e-mail do usuário
    db_user = db.query(models.User).filter(models.User.email == user['sub']).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    despesas = db.query(models.Despesa).filter(models.Despesa.user_id == db_user.id).all()
    return despesas

@router.get("/rendimentos/", response_model=list[schemas.Rendimento_Response])
def get_rendimentos(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = verify_token(token)  # Decodifica o token para pegar o e-mail do usuário
    db_user = db.query(models.User).filter(models.User.email == user['sub']).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    rendimentos = db.query(models.Rendimento).filter(models.Rendimento.user_id == db_user.id).all()
    return rendimentos

@router.get("/saldo/", response_model=dict)
def get_saldo(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = verify_token(token)  # Decodifica o token para pegar o e-mail do usuário
    db_user = db.query(models.User).filter(models.User.email == user['sub']).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    total_rendimentos = db.query(models.Rendimento).filter(models.Rendimento.user_id == db_user.id).all()
    total_rendimento = sum([r.amount for r in total_rendimentos])

    # Soma as despesas
    total_despesas = db.query(models.Despesa).filter(models.Despesa.user_id == db_user.id).all()
    total_despesa = sum([d.amount for d in total_despesas])

    saldo = total_rendimento - total_despesa

    return {"saldo": saldo}

@router.put("/despesas/{despesa_id}/", response_model=schemas.Despesa_Response)
def edit_despesa(despesa_id: int, despesa: schemas.Despesa_Create, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = verify_token(token)  # Decodifica o token para pegar o e-mail do usuário
    db_user = db.query(models.User).filter(models.User.email == user['sub']).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    existing_despesa = db.query(models.Despesa).filter(models.Despesa.id == despesa_id, models.Despesa.user_id == db_user.id).first()

    if not existing_despesa:
        raise HTTPException(status_code=404, detail="Despesa não encontrada")

    # Atualizando os dados da despesa
    existing_despesa.amount = despesa.amount
    existing_despesa.category = despesa.category
    existing_despesa.description = despesa.description
    existing_despesa.date = despesa.date

    db.commit()
    db.refresh(existing_despesa)

    return existing_despesa

@router.put("/rendimentos/{rendimento_id}/", response_model=schemas.Rendimento_Response)
def edit_rendimento(rendimento_id: int, rendimento: schemas.Rendimento_Create, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = verify_token(token)  # Decodifica o token para pegar o e-mail do usuário
    db_user = db.query(models.User).filter(models.User.email == user['sub']).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    existing_rendimento = db.query(models.Rendimento).filter(models.Rendimento.id == rendimento_id, models.Rendimento.user_id == db_user.id).first()

    if not existing_rendimento:
        raise HTTPException(status_code=404, detail="Rendimento não encontrado")

    # Atualizando os dados do rendimento
    existing_rendimento.amount = rendimento.amount
    existing_rendimento.category = rendimento.category
    existing_rendimento.description = rendimento.description
    existing_rendimento.date = rendimento.date

    db.commit()
    db.refresh(existing_rendimento)

    return existing_rendimento

@router.delete("/rendimentos/{rendimento_id}/")
def delete_rendimento(rendimento_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = verify_token(token)  # Decodifica o token para pegar o e-mail do usuário
    db_user = db.query(models.User).filter(models.User.email == user['sub']).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    existing_rendimento = db.query(models.Rendimento).filter(models.Rendimento.id == rendimento_id, models.Rendimento.user_id == db_user.id).first()

    if not existing_rendimento:
        raise HTTPException(status_code=404, detail="Rendimento não encontrado")

    db.delete(existing_rendimento)
    db.commit()

    return {"detail": "Rendimento excluído com sucesso"}

@router.delete("/despesas/{despesa_id}/")
def delete_despesa(despesa_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = verify_token(token)  # Decodifica o token para pegar o e-mail do usuário
    db_user = db.query(models.User).filter(models.User.email == user['sub']).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    existing_despesa = db.query(models.Despesa).filter(models.Despesa.id == despesa_id, models.Despesa.user_id == db_user.id).first()

    if not existing_despesa:
        raise HTTPException(status_code=404, detail="Despesa não encontrada")

    db.delete(existing_despesa)
    db.commit()

    return {"detail": "Despesa excluída com sucesso"}

