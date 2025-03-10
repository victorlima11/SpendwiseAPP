import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import coin from "/src/assets/coin.png"
// Importando o módulo do efeito de gradiente borrado
import { BlurGradientBg } from '../assets/BlurGradientBg.module.js';

function Home() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const section = document.querySelector('.section-sobre');
    if (section && window.scrollY > section.offsetTop) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    console.log('Script de fundo borrado executado');
    new BlurGradientBg({
      dom: "box",
      colors: ["#000000", "#0d2a59", "#000000", "#416081"],
      loop: true
    });
  }, []);

  return (
    <div className="container">
      {/* Navegação */}
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

      <div className="hero">
        <div id="box"></div>
        <div className="hero-text">
          <h1>Controle Suas Finanças com o <span className="highlight">Spendwise.</span></h1>
          <p>Gerencie seus gastos, economize mais e alcance seus objetivos financeiros com facilidade. Organize seu orçamento, acompanhe suas despesas e visualize gráficos de progresso para saber exatamente onde está o seu dinheiro. Com o Spendwise, você pode tomar decisões mais inteligentes e alcançar a saúde financeira de forma eficiente e prática.</p>
          <div className="buttons">
            <Link className="button-start learn-more" to="/dashboard">
              <span className="circle">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Começar</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="features-container">
          <div className="features-title">
            <h1 className="feature-h1">Features</h1>
            <p>Esses são os serviços disponíveis por nosso software.</p>
          </div>
          <div className="feature-cards-container">
            <div className="feature-cards">
                <div className="mini-title">
                  <img className="card-image" src={coin} alt="coin"/>
                  <p>Teste</p>
                </div>
                <div className="feature-card-title">
                  <h1>Título do card</h1>
                </div>
                <div className="feature-card-content">
                  <p>Esse é o teste de card.</p>
                </div>
            </div>
            <div className="feature-cards">
              <div className="mini-title">
                <img className="card-image" src={coin} alt="coin"/>
                <p>Teste</p>
              </div>
              <div className="feature-card-title">
                <h1>Título do card</h1>
              </div>
              <div className="feature-card-content">
                <p>Esse é o teste de card.</p>
              </div>
          </div>
          <div className="feature-cards">
              <div className="mini-title">
                <img className="card-image" src={coin} alt="coin"/>
                <p>Teste</p>
              </div>
              <div className="feature-card-title">
                <h1>Título do card</h1>
              </div>
              <div className="feature-card-content">
                <p>Esse é o teste de card.</p>
              </div>
          </div>
          <div className="feature-cards">
              <div className="mini-title">
                <img className="card-image" src={coin} alt="coin"/>
                <p>Teste</p>
              </div>
              <div className="feature-card-title">
                <h1>Título do card</h1>
              </div>
              <div className="feature-card-content">
                <p>Esse é o teste de card.</p>
              </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default Home;
