import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      console.error("Erro no login:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? <a href="#">Cadastre-se</a></p>
    </div>
  );
};

export default LoginForm;
