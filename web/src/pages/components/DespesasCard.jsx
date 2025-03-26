import React, { useEffect, useState } from "react";
import axios from "axios";
import { CreditCard } from "lucide-react";
import './styles/despesaMes.css';

const DespesasCard = () => {
  const [despesasCount, setDespesasCount] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchDespesas = async () => {
      try {
        const response = await axios.get("https://spendwiseapp.onrender.com/users/despesas/", {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    <div className="card-despesas-mes">
  <CreditCard size={40} className="card-icon-despesas-mes" />
  <h3 className="card-title-despesas-mes">Número de Despesas no Mês</h3>
  <p className="card-description-despesas-mes">{despesasCount} Despesas</p>
  <p className="card-total-despesas-mes">Total: R$ {totalDespesas.toFixed(2)}</p>
</div>
  );
};

export default DespesasCard;
