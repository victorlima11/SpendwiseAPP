import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '/src/pages/components/styles/loginForm.css'
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/users/login/", { email, password });
      const { access_token } = response.data;
      if (access_token) {
        localStorage.setItem("token", access_token);
        navigate("/dashboard");
      } else {
        throw new Error("Nenhum access_token recebido na resposta");
      }
    } catch (error) {
      console.error("Erro no login:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-form">
          <h1>Spendwise.</h1>
        </div>
        {error && <p className="error-message">{error}</p>}
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="forgot-password">
              <a href="/reset-password">Esqueceu a senha?</a>
          </div>
          <button type="submit">Entrar</button>
        </form>
        <p>Não tem uma conta? <a className="register" href="/register">Cadastre-se</a></p>
      </div>
    </div>
  );
};

export default LoginForm;