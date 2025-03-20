import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import "/src/pages/components/styles/registerForm.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email.match(/\S+@\S+\.\S+/)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      const response = await axios.post("https://spendwiseapp.onrender.com/users/register/", {
        name,
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao registrar conta. Email já cadastrado.")
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-logo">
          <h1>Spendwise.</h1>
        </div>
        <h2 className="register-title">Registrar</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="register-form" onSubmit={handleRegister}>
          <input
            className="register-input"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="register-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="register-input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="register-button" type="submit">Registrar</button>
        </form>
        <p className="register-footer">Já tem uma conta? <Link className="register-link" to="/login">Faça login</Link></p>
      </div>
    </div>
  );
};

export default RegisterForm;