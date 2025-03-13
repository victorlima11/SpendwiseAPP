import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '/src/pages/components/styles/navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload();
  };
  
  return (
    <nav className="navbar">
      <div className="logo">Spendwise</div>
      <div className="menu">
        <a href="#" className='nav-items'>Conta</a>
        <a href="/dashboard" className='nav-items'>Dashboard</a>
        <a href="#features" className='nav-items'>Sobre</a>
        <a href="/register" className='nav-items'>Cadastro</a>
        {isLoggedIn ? (
          <Link className="login-button" to="/" onClick={handleLogout}>Sair</Link>
        ) : (
          <Link className="login-button" to="/login">Login</Link> )}
      </div>
    </nav>
  );
}

export default Navbar;
