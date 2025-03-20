import React from "react";
import erro from "../assets/error.png";
import "./components/styles/notFound.css";

const NotFound = () => {
  return (
    <div className="error-container">
        <h1 className="error-h1">Erro 404</h1>
        <h3 className="error-h3">Página não encontrada</h3>
        <img className="error-img" src={erro} alt="erro-image" />
    </div>
  );
};

export default NotFound;
