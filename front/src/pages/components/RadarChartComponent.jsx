import { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import "./styles/radarChartComponent.css";

const categories = ["Alimentação", "Saúde", "Transporte", "Moradia", "Educação", "Lazer", "Outros"];

const RadarChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Mês atual
  const [year, setYear] = useState(new Date().getFullYear()); // Ano atual
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const params = { month, year };
        const response = await axios.get("http://localhost:8000/users/despesas/", {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });

        // Processando os dados para o gráfico
        const data = categories.map((category) => {
          // Filtrando as despesas com base no mês e ano, usando split("-") para separar a data
          const total = response.data
            .filter((item) => {
              const [dataAno, dataMes] = item.date.split("-").map(Number); // Pegando ano e mês da data
              return dataAno === year && dataMes === month;
            })
            .filter((item) => item.category === category || (category === "Outros" && !categories.includes(item.category)))
            .reduce((sum, item) => sum + item.amount, 0);

          return { category, value: total };
        });

        setChartData(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setChartData(categories.map((category) => ({ category, value: 0 }))); // Se erro, retorna valores 0
      }

      setLoading(false);
    };

    fetchData();
  }, [month, year]);

  return (
    <div className="radar-chart-container">
      <div className="filters">
        {/* Filtro de mês */}
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </option>
          ))}
        </select>

        {/* Filtro de ano */}
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData} outerRadius={90}>
            <PolarGrid stroke="#444" />
            <PolarAngleAxis dataKey="category" tick={{ fill: "#ddd" }} />
            <Tooltip contentStyle={{ backgroundColor: "#222", borderRadius: "5px", color: "#fff" }} />
            <Radar name="Gastos" dataKey="value" stroke="#FF5555" fill="#FF8888" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RadarChartComponent;
