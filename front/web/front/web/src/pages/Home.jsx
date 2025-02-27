// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import logo from '/src/assets/spendwisr.png';
import celular from '/src/assets/celular.png'

function Home() {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Spendwise</div>
        <div className="menu">
          <a href="#">Conta</a>
          <a href="#">Dashboard</a>
          <a href="#">Sobre</a>
          <a href="#">Cadastro</a>
          <button className="login-button">Login</button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="hero">
      <div className="hero-image">
          <img src={celular} alt="Spendwise app" id='celular'/>
        </div>
        <div className="hero-text">
          <h1>Controle Suas Finanças com o <span className="highlight">Spendwise</span></h1>
          <p>Gerencie seus gastos, economize mais e alcance seus objetivos financeiros com facilidade. Organize seu orçamento, acompanhe suas despesas e visualize gráficos de progresso para saber exatamente onde está o seu dinheiro. Com o Spendwise, você pode tomar decisões mais inteligentes e alcançar a saúde financeira de forma eficiente e prática.</p>
          <div className='buttons'>
            <button className='button-start'>Começar</button>
            <button className='button-plans'>Planos</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
