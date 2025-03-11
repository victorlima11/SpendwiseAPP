import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import audit from "/src/assets/audit.png"
import lamp from "/src/assets/lamp.png"
import monitor from "/src/assets/monitor.png"
import Navbar from '/src/pages/components/Navbar';


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
      <Navbar />
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
            <div className="feature-text">
              <h2>Facilidade e agilidade ao seu alcance.</h2>
            </div>
            <div className="sobre-content">
              <h1>Sobre</h1>
              <h2>Projeto Spendwise.</h2>
              <p>Este projeto foi feito com a finalidade de aprendizado de sistemas web, desde a criação do Front-End usando react, quanto também funcionamento de APIs RESTFUL usando python como Back-End.</p>
            </div>
          </div>
          <div className="feature-cards-container">
            <div className="feature-cards">
                <div className="mini-title">
                  <img className="card-image" src={audit} alt="coin"/>
                  <p>Visualização</p>
                </div>
                <div className="feature-card-title">
                  <h1>Visualize e Planeje seus gastos.</h1>
                </div>
                <div className="feature-card-content">
                  <p>Com o Spendwise, você tem o poder de organizar e controlar suas finanças de maneira eficiente. O mapeamento detalhado de suas transações permite que você acompanhe seus gastos de forma clara e precisa.
                  Organize seus Relatórios.</p>
                </div>
            </div>
            <div className="feature-cards">
              <div className="mini-title">
                <img className="card-image" src={lamp} alt="coin"/>
                <p>Organização</p>
              </div>
              <div className="feature-card-title">
                <h1>Organize seus Relatórios.</h1>
              </div>
              <div className="feature-card-content">
                <p>Gere relatórios detalhados sobre seus gastos, com gráficos e resumos de transações. Facilite o acompanhamento de sua saúde financeira
                Defina Orçamentos.</p>
              </div>
          </div>
          <div className="feature-cards">
              <div className="mini-title">
                <img className="card-image" src={monitor} alt="coin"/>
                <p>Monitoração</p>
              </div>
              <div className="feature-card-title">
                <h1>Acompanhe Metas.</h1>
              </div>
              <div className="feature-card-content">
                <p>Monitore o progresso de suas metas financeiras com relatórios atualizados sobre o status de cada objetivo.</p>
              </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default Home;
