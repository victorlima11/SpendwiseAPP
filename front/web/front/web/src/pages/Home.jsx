// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  return (
    <div className='navbar'>
      <div className='logo-items'>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className='logo'>Spendwise</h1>
        </Link>
      </div>

      <div className='nav-div'>
        <ul className='nav-ul'>
          <li className='nav-li'>
            <Link to="/conta" className="nav-link">Conta</Link>
          </li>
          <li className='nav-li'>
            <Link to="/sobre" className="nav-link">Dashboard</Link>
          </li>
          <li className='nav-li'>
            <Link to="/criar-conta" className="nav-link">Sobre</Link>
          </li>
        </ul>

        {/* Seção separada para Login e Cadastro, mas ainda na mesma linha */}
        <ul className='auth-ul'>
          <li className='nav-li'>
            <Link to="/cadastrar" className="nav-link auth-link">Cadastre-se</Link>
          </li>
          <li className='nav-li'>
            <Link to="/logar" className="nav-link auth-link">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
