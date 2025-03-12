import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "/src/pages/components/styles/registerForm.css"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!email.match(/\S+@\S+\.\S+/)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8000/users/register/", {
        name: name,
        email: email,
        password: password,
      });
  
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      alert("Não foi possível registrar sua conta.");
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
      <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
