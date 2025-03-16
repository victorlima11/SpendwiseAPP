import { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import Loader from "./Loader";

const categories = ["Alimentação", "Saúde", "Transporte", "Moradia", "Educação", "Lazer", "Outros"];

const RadarChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
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

        const data = categories.map((category) => {
          const total = response.data
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
        console.error("Erro ao buscar dados:", error);
        setChartData(categories.map((category) => ({ category, value: 0 }))); // Se erro, retorna valores 0
      }

      setLoading(false);
    };

    fetchData();
  }, [month, year]);

  return (
    <div className="radar-card">
      <div className="radar-card-content">
        {loading ? (
            <Loader />
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={chartData} outerRadius={70}>
              <PolarGrid stroke="#ddd" />
              <PolarAngleAxis dataKey="category" tick={{ fill: "#333", fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "#222", borderRadius: "5px", color: "#fff" }} />
              <Radar name="Gastos" dataKey="value" stroke="#FF5555" fill="#FF8888" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RadarChartComponent;
