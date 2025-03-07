// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove o token do localStorage
    localStorage.removeItem('token');

    // Redireciona o usuário para a página de login
    navigate('/');
  }, [navigate]);

  return <p>Desconectando...</p>;
}

export default Logout;
