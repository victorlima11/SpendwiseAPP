import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles/DashboardMainChart.css';

const DashboardMainChart = () => {
  const [chartData, setChartData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [despesasRes, rendimentosRes] = await Promise.all([
          axios.get("http://localhost:8000/users/despesas/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/users/rendimentos/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Filtrar os dados corretamente
        const despesas = despesasRes.data
          .filter((d) => {
            const [dataAno, dataMes] = d.date.split("-").map(Number);
            return dataAno === year && dataMes === month;
          })
          .map((d) => ({
            date: d.date.split("-")[2], // Pegando apenas o dia
            despesa: d.amount,
            rendimento: 0,
          }));

        const rendimentos = rendimentosRes.data
          .filter((r) => {
            const [dataAno, dataMes] = r.date.split("-").map(Number);
            return dataAno === year && dataMes === month;
          })
          .map((r) => ({
            date: r.date.split("-")[2], // Pegando apenas o dia
            despesa: 0,
            rendimento: r.amount,
          }));

        // Mesclar despesas e rendimentos no mesmo array
        const mergedData = [...despesas, ...rendimentos].reduce((acc, curr) => {
          const existing = acc.find((item) => item.date === curr.date);
          if (existing) {
            existing.despesa += curr.despesa;
            existing.rendimento += curr.rendimento;
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);

        // Ordenando por dia do mês
        mergedData.sort((a, b) => Number(a.date) - Number(b.date));

        setChartData(mergedData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [month, year, navigate]);

  return (
    <div className="chart-container">
      <div className="filters">
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => {
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
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" tick={{ fill: "#ddd" }} />
            <YAxis domain={[0, "auto"]} tick={{ fill: "#ddd" }} />
            <Tooltip contentStyle={{ backgroundColor: "#222", borderRadius: "5px", color: "#fff" }} />
            <Legend verticalAlign="top" align="right" wrapperStyle={{ color: "#ddd" }} />
            <Line
              type="monotone"
              dataKey="despesa"
              stroke="#ff4d4d"
              strokeWidth={3}
              dot={{ r: 6, fill: "#ff4d4d", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8, fill: "#ffcccc", strokeWidth: 2, stroke: "#ff4d4d" }} />
            <Line
              type="monotone"
              dataKey="rendimento"
              stroke="#4dff4d"
              strokeWidth={3}
              dot={{ r: 6, fill: "#4dff4d", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8, fill: "#ccffcc", strokeWidth: 2, stroke: "#4dff4d" }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DashboardMainChart;
