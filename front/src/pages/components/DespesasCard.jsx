import React, { useEffect, useState } from "react";
import axios from "axios";
import { CreditCard } from "lucide-react";
import './styles/dashboardCards.css';

const DespesasCard = () => {
  const [despesasCount, setDespesasCount] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchDespesas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users/despesas/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Filtrando despesas do mês atual
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        
        const despesasNoMes = response.data.filter(despesa => {
          const [year, month] = despesa.date.split("-").map(Number);
          return year === currentYear && month === currentMonth;
        });

        const total = despesasNoMes.reduce((sum, item) => sum + item.amount, 0);

        setDespesasCount(despesasNoMes.length);
        setTotalDespesas(total);
      } catch (error) {
        console.error("Erro ao carregar despesas", error);
      }
    };

    fetchDespesas();
  }, []);

  return (
    <div className="card">
      <CreditCard size={32} className="card-icon" />
      <h3 className="card-title">Número de Despesas no Mês</h3>
      <p className="card-description">{despesasCount} Despesas</p>
      <p className="card-total">Total: R$ {totalDespesas.toFixed(2)}</p>
    </div>
  );
};

export default DespesasCard;
