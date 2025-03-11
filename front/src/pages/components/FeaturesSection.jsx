import React from 'react';
import FeatureCard from './FeatureCard';
import audit from '/src/assets/audit.png';
import lamp from '/src/assets/lamp.png';
import monitor from '/src/assets/monitor.png';
import '/src/pages/components/styles/features.css';

function FeaturesSection() {
    return (
        <div className="features-container">
            <div className="feature-main-text">
                <div className="features-title">
                    <h1 className="feature-h1">Features</h1>
                    <p>Esses são os serviços disponíveis por nosso software.</p>
                </div>
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
                <FeatureCard image={audit} mini="Visualização" title="Visualize e Planeje seus gastos." description="Com o Spendwise, você tem o poder de organizar e controlar suas finanças de maneira eficiente. O mapeamento detalhado de suas transações permite que você acompanhe seus gastos de forma clara e precisa." />
                <FeatureCard image={lamp} mini="Organização" title="Organize seus Relatórios." description="Gere relatórios detalhados sobre seus gastos, com gráficos e resumos de transações. Facilite o acompanhamento de sua saúde financeira." />
                <FeatureCard image={monitor} mini="Monitoração" title="Acompanhe seus gastos" description="Monitore o progresso de suas metas financeiras com relatórios atualizados sobre o status de cada objetivo." />
            </div>
        </div>
    );
}

export default FeaturesSection;
