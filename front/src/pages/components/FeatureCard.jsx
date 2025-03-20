import React from 'react';
import '/src/pages/components/styles/features.css';

function FeatureCard({ image, mini, title, description }) {
  return (
    <div className="feature-card">
      <div className="mini-title">
        <img className="card-image" src={image} alt={title} />
        <p>{mini}</p>
      </div>
      <div className="feature-card-title">
        <h1>{title}</h1>
      </div>
      <div className="feature-card-content">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
