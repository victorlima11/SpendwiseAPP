// pages/Sobre.js
import React from 'react';
import { Link } from 'react-router-dom';

function Sobre() {
  return (
    <div>
      <h1>Página Sobre</h1>
      <p>Informações sobre o site.</p>
      <Link to="/">Voltar para a Home</Link>
      <br />
      <Link to="/contato">Ir para Contato</Link>
    </div>
  );
}

export default Sobre;
