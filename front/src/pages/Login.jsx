import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/users/login/", { email, password });
      console.log("Resposta do backend:", response.data); // Adicione este log para verificar a resposta
      const { access_token } = response.data; // Corrija para "access_token"

      if (access_token) {
        localStorage.setItem("token", access_token); // Salva o token corretamente
        console.log("Token salvo no localStorage:", access_token); // Confirme que foi salvo
        navigate("/dashboard"); // Redireciona para o dashboard
      } else {
        throw new Error("Nenhum access_token recebido na resposta");
      }
    } catch (error) {
      console.error("Erro no login:", error.response ? error.response.data : error.message);
      alert("Login falhou! Verifique suas credenciais.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;