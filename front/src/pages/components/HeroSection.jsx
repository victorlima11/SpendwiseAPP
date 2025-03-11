import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import '/src/pages/components/styles/heroSection.css';
import { BlurGradientBg } from "/src/assets/BlurGradientBg.module.js";

function HeroSection() {
  useEffect(() => {
    console.log("Script de fundo borrado executado");
    new BlurGradientBg({
      dom: "box",
      colors: ["#000000", "#0d2a59", "#000000", "#416081"],
      loop: true,
    });
  }, []);

  return (
    <div className="hero">
      <div id="box"></div>
      <div className="hero-text">
        <h1>
          Controle Suas Finanças com o <span className="highlight">Spendwise.</span>
        </h1>
        <p>
            Gerencie seus gastos, economize mais e alcance seus objetivos financeiros com facilidade. Organize seu orçamento, acompanhe suas despesas e visualize gráficos de progresso para saber exatamente onde está o seu dinheiro. Com o Spendwise, você pode tomar decisões mais inteligentes e alcançar a saúde financeira de forma eficiente e prática.
        </p>
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
  );
}

export default HeroSection;
