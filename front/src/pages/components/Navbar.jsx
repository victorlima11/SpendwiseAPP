import React from 'react';
import { Link } from 'react-router-dom';
import '/src/pages/components/styles/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Spendwise</div>
      <div className="menu">
        <a href="#" className='nav-items'>Conta</a>
        <a href="/dashboard" className='nav-items'>Dashboard</a>
        <a href="#" className='nav-items'>Sobre</a>
        <a href="/register" className='nav-items'>Cadastro</a>
        <Link className="login-button" to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
