import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import logo from '/src/assets/spendwisr.png';
import celular from '/src/assets/celular.png';

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
      colors: ["#000000","#0d2a59","#000000","#416081"],
      loop: true
    });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

      {/* Seção Hero com o fundo borrado */}
      <div className="hero">
        <div id="box"></div> {/* Aqui está o fundo borrado */}
        <div className="hero-text">
          <h1>Controle Suas Finanças com o <span className="highlight">Spendwise.</span></h1>
          <p>Gerencie seus gastos, economize mais e alcance seus objetivos financeiros com facilidade. Organize seu orçamento, acompanhe suas despesas e visualize gráficos de progresso para saber exatamente onde está o seu dinheiro. Com o Spendwise, você pode tomar decisões mais inteligentes e alcançar a saúde financeira de forma eficiente e prática.</p>
          <div className="buttons">
            <button className="button-start learn-more">
              <span className="circle">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Começar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Segunda Seção com fundo diferente */}
      <div className="new-section">
        <div className="new-section-content">
          <h2>Explore Nossos Planos</h2>
          <p>Escolha o plano que melhor se adapta às suas necessidades financeiras. O Spendwise oferece soluções para todos os tipos de usuário!</p>
          <button className="button-new-section">Saiba Mais</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
