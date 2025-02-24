import streamlit as st
import requests

BASE_URL = "http://127.0.0.1:8000"

st.title("Sistema de Login - FastAPI")

# Cadastro de Usuário
st.subheader("Cadastro")
name = st.text_input("Nome")
email = st.text_input("E-mail")
password = st.text_input("Senha", type="password")

if st.button("Cadastrar"):
    response = requests.post(f"{BASE_URL}/users/register/", json={"name": name, "email": email, "password": password})
    st.success(response.json())

# Login
st.subheader("Login")
login_email = st.text_input("E-mail de Login")
login_password = st.text_input("Senha de Login", type="password")

if st.button("Entrar"):
    response = requests.post(f"{BASE_URL}/users/login/", json={"email": login_email, "password": login_password})
    if response.status_code == 200:
        token = response.json()["access_token"]
        st.session_state["token"] = token  # Salva o token na sessão
        st.success("Login bem-sucedido!")
    else:
        st.error("Usuário ou senha inválidos.")

# Rota Protegida
if "token" in st.session_state:
    st.subheader("Perfil do Usuário")
    headers = {"Authorization": f"Bearer {st.session_state['token']}"}
    response = requests.get(f"{BASE_URL}/users/me/", headers=headers)
    
    if response.status_code == 200:
        st.json(response.json())
    else:
        st.error("Erro ao acessar o perfil.")
