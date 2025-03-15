import React, { useEffect, useState } from "react";
import axios from "axios";
import { DollarSign } from "lucide-react";
import './styles/rendimentoMes.css';

const RendimentosCard = () => {
  const [rendimentosCount, setRendimentosCount] = useState(0);
  const [totalRendimentos, setTotalRendimentos] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchRendimentos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users/rendimentos/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Filtrando rendimentos do mês atual
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        
        const rendimentosNoMes = response.data.filter(rendimento => {
          const [year, month] = rendimento.date.split("-").map(Number);
          return year === currentYear && month === currentMonth;
        });

        const total = rendimentosNoMes.reduce((sum, item) => sum + item.amount, 0);

        setRendimentosCount(rendimentosNoMes.length);
        setTotalRendimentos(total);
      } catch (error) {
        console.error("Erro ao carregar rendimentos", error);
      }
    };

    fetchRendimentos();
  }, []);

  return (
    <div className="card-rendimento-mes">
      <DollarSign size={32} className="card-icon-rendimento-mes" />
      <h3 className="card-title-rendimento-mes">Número de Rendimentos no Mês</h3>
      <p className="card-descriptio-rendimento-mes">{rendimentosCount} Rendimentos</p>
      <p className="card-total-rendimento-mes">Total: R$ {totalRendimentos.toFixed(2)}</p>
    </div>
  );
};

export default RendimentosCard;
