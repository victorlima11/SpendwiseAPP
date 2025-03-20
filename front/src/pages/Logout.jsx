// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');

    navigate('/');
  }, [navigate]);

  return <p>Desconectando...</p>;
}

export default Logout;
