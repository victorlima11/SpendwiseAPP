from passlib.context import CryptContext

# Usando o algoritmo Argon2, que é recomendado e seguro
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hash_password(password: str) -> str:
    """
    Função para criptografar a senha.
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Função para verificar se a senha fornecida corresponde ao hash armazenado.
    """
    return pwd_context.verify(plain_password, hashed_password)
