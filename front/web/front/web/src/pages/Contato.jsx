// src/pages/Contato.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Contato() {
  return (
    <div>
      <h1>Página de Contato</h1>
      <p>Informações de contato.</p>
      <Link to="/">Voltar para a Home</Link>
      <br />
      <Link to="/sobre">Ir para Sobre</Link>
    </div>
  );
}

export default Contato;
