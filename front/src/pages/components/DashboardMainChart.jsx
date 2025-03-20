import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import './styles/dashboardMainChart.css';

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
          axios.get("https://spendwiseapp.onrender.com/users/despesas/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://spendwiseapp.onrender.com/users/rendimentos/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const despesas = despesasRes.data
          .filter((d) => {
            const [dataAno, dataMes] = d.date.split("-").map(Number);
            return dataAno === year && dataMes === month;
          })
          .map((d) => ({
            date: d.date.split("-")[2],
            despesa: d.amount,
            rendimento: 0,
          }));

        const rendimentos = rendimentosRes.data
          .filter((r) => {
            const [dataAno, dataMes] = r.date.split("-").map(Number);
            return dataAno === year && dataMes === month;
          })
          .map((r) => ({
            date: r.date.split("-")[2],
            despesa: 0,
            rendimento: r.amount,
          }));

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
      <div className="chart-items">
        <div className="chart-text-item">
          <h2 className="chart-text">Dados Mensais</h2>
        </div>
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
      </div>


      {loading ? (
    <div className="loader-main" style={{ height: '100%', width: '100%' }}>
      <Loader />
    </div>
  ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="despesaGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8A2BE2" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#DDA0DD" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="rendimentoGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00FFFF" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#1E90FF" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" tick={{ fill: "#ddd" }} />
            <YAxis domain={[0, "auto"]} tick={{ fill: "#ddd" }} />
            <Tooltip
              contentStyle={{
                background: "rgba(20, 20, 30, 0.6)",
                borderRadius: "12px",
                padding: "12px 16px",
                border: "none",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              itemStyle={{
                color: "#fff",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "capitalize",
              }}
              labelStyle={{
                color: "#fff",
                fontWeight: "bold",
              }}
              cursor={{ stroke: "#8A2BE2", strokeWidth: 2 }}
              formatter={(value, name) => {
                return name === "despesa" || name === "rendimento" ? `R$ ${value.toFixed(2)}` : value;
              }}
            />


            <Legend verticalAlign="top" align="right" wrapperStyle={{ color: "#ddd" }} />
            <Line
              type="monotone"
              dataKey="despesa"
              stroke="url(#despesaGradient)"
              strokeWidth={3}
              dot={{ r: 4, fill: "#8A2BE2", strokeWidth: 1, stroke: "#DDA0DD" }}
              activeDot={{ r: 6, fill: "#DDA0DD", strokeWidth: 2, stroke: "#8A2BE2" }}
            />
            <Line
              type="monotone"
              dataKey="rendimento"
              stroke="url(#rendimentoGradient)"
              strokeWidth={3}
              dot={{ r: 4, fill: "#00FFFF", strokeWidth: 1, stroke: "#1E90FF" }}
              activeDot={{ r: 6, fill: "#1E90FF", strokeWidth: 2, stroke: "#00FFFF" }}
            />
          </LineChart>
        </ResponsiveContainer>

      )}
    </div>
  );
};

export default DashboardMainChart;
