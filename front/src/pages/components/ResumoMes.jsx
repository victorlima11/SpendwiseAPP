import React from "react";
import RendimentosCard from "./RendimentosCard";
import DespesasCard from "./DespesasCard";
import AssinaturasCard from "./AssinaturasCard";
import './styles/gridResumo.css';

const ResumoMes = () => {
    return (
      <div className="card-resumo">
        <div className="top-row">
          <RendimentosCard />
          <DespesasCard />
        </div>
        <div className="bottom-row">
          <AssinaturasCard />
        </div>
      </div>
    );
  };
  
  export default ResumoMes;