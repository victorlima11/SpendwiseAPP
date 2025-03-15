import React, { useEffect, useState } from "react";
import axios from "axios";
import { CreditCard, TrendingDown, TrendingUp, Percent } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./styles/dashboardCards.css";

const categories = ["Alimentação", "Saúde", "Transporte", "Moradia", "Educação", "Lazer", "Outros"];

const DashboardCards = () => {
  const [saldo, setSaldo] = useState(null);
  const [ultimaDespesa, setUltimaDespesa] = useState(null);
  const [ultimoInvestimento, setUltimoInvestimento] = useState(null);
  const [lucroPercentual, setLucroPercentual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchSaldo = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users/saldo/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && !isNaN(response.data.saldo)) {
          setSaldo(Number(response.data.saldo));
        } else {
          setSaldo(0);
        }
      } catch (error) {
        console.error("Erro ao buscar saldo:", error);
        setSaldo(0);
      }
    };

    const fetchUltimosDados = async () => {
      try {
        const [despesasRes, rendimentosRes] = await Promise.all([
          axios.get("http://localhost:8000/users/despesas/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/users/rendimentos/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const ultimaDespesa = despesasRes.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        const ultimoInvestimento = rendimentosRes.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        setUltimaDespesa(ultimaDespesa);
        setUltimoInvestimento(ultimoInvestimento);

        const totalDespesas = despesasRes.data.reduce((acc, d) => acc + d.amount, 0);
        const totalRendimentos = rendimentosRes.data.reduce((acc, r) => acc + r.amount, 0);

        if (totalRendimentos > 0) {
          const lucro = ((totalRendimentos - totalDespesas) / totalRendimentos) * 100;
          setLucroPercentual(lucro);
        } else {
          setLucroPercentual(null);
        }

        // Prepara os dados para o gráfico
        const data = categories.map((category) => {
          const total = despesasRes.data
            .filter((item) => {
              const [dataAno, dataMes] = item.date.split("-").map(Number);
              return dataAno === year && dataMes === month;
            })
            .filter((item) => item.category === category || (category === "Outros" && !categories.includes(item.category)))
            .reduce((sum, item) => sum + item.amount, 0);

          return { category, value: total };
        });

        setChartData(data);
      } catch (error) {
        console.error("Erro ao buscar últimas transações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaldo();
    fetchUltimosDados();
  }, [month, year]);

  return (
    <div className="cards-container">
      <div className="card">
        <CreditCard size={32} className="card-icon" />
        <h3 className="card-title">Saldo</h3>
        <p className={`card-value ${saldo < 0 ? "negative" : "positive"}`}>
          {loading ? "Carregando..." : `R$ ${saldo?.toFixed(2)}`}
        </p>
      </div>
      <div className="card">
        <TrendingDown size={32} className="card-icon negative" />
        <h3 className="card-title">Última Despesa</h3>
        <p className="card-value negative">
          {loading
            ? "Carregando..."
            : ultimaDespesa
            ? `R$ ${ultimaDespesa.amount.toFixed(2)} (${ultimaDespesa.category})`
            : "Nenhuma despesa"}
        </p>
      </div>
      <div className="card">
        <TrendingUp size={32} className="card-icon positive" />
        <h3 className="card-title">Último Investimento</h3>
        <p className="card-value positive">
          {loading
            ? "Carregando..."
            : ultimoInvestimento
            ? `R$ ${ultimoInvestimento.amount.toFixed(2)} (${ultimoInvestimento.category})`
            : "Nenhum investimento"}
        </p>
      </div>
      <div className="card">
        <Percent size={32} className="card-icon" />
        <h3 className="card-title">Lucro (%)</h3>
        <p className={`card-value ${lucroPercentual < 0 ? "negative" : "positive"}`}>
          {loading
            ? "Carregando..."
            : lucroPercentual !== null
            ? `${lucroPercentual.toFixed(2)}%`
            : "Sem dados suficientes"}
        </p>
      </div>
      <div className="card radar-card"> {/* Card para o gráfico */}
        <h3 className="card-title">Gráfico de Gastos</h3>
        <div className="radar-card-content">
          {loading ? (
            <div className="loading">Carregando gráfico...</div>
          ) : (
            <ResponsiveContainer width="100%" height={150}>
              <RadarChart data={chartData} outerRadius={50}>
                <PolarGrid stroke="#ddd" />
                <PolarAngleAxis dataKey="category" tick={{ fill: "#333", fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: "#222", borderRadius: "5px", color: "#fff" }} />
                <Radar name="Gastos" dataKey="value" stroke="#FF5555" fill="#FF8888" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
