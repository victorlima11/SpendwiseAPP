import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles/DashboardMainChart.css'; // Importe o arquivo CSS para estilizar os elementos

const DashboardMainChart = () => {
  const [chartData, setChartData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Mês atual
  const [year, setYear] = useState(new Date().getFullYear()); // Ano atual
  const [loading, setLoading] = useState(true); // Para exibir o carregando
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtém o token JWT do localStorage ou onde você armazenar o token

    if (!token) {
      // Se não houver token, redireciona para a página de login
      navigate("/login");
      return; // Evita continuar a execução do código
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        // Enviar mês e ano como parâmetros para filtrar a consulta
        const params = { month, year };

        // Realiza as requisições para despesas e rendimentos, filtrando pelo mês e ano
        const [despesasRes, rendimentosRes] = await Promise.all([
          axios.get("http://localhost:8000/users/despesas/", {
            headers: { Authorization: `Bearer ${token}` },
            params, // Envia mês e ano como query params
          }),
          axios.get("http://localhost:8000/users/rendimentos/", {
            headers: { Authorization: `Bearer ${token}` },
            params, // Envia mês e ano como query params
          }),
        ]);

        // Processando as despesas para incluir o valor e a data
        const despesas = despesasRes.data.map((d) => {
          const [year, month] = d.date.split("-"); // Pegando o ano e o mês da data
          return {
            date: `${year}-${month}`, // Formato 'YYYY-MM' para facilitar a comparação
            value: d.amount,
            type: "despesa",
          };
        });

        // Processando os rendimentos para incluir o valor e a data
        const rendimentos = rendimentosRes.data.map((r) => {
          const [year, month] = r.date.split("-"); // Pegando o ano e o mês da data
          return {
            date: `${year}-${month}`, // Formato 'YYYY-MM' para facilitar a comparação
            value: r.amount,
            type: "rendimento",
          };
        });

        // Mesclando despesas e rendimentos
        const mergedData = [...despesas, ...rendimentos];

        // Filtrando apenas os dados do mês e ano selecionados
        const filteredData = mergedData.filter((data) => {
          const [dataYear, dataMonth] = data.date.split("-"); // Separando o ano e o mês
          return dataYear === String(year) && dataMonth === String(month).padStart(2, "0");
        });

        // Ordenando os dados pela data
        filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Agrupando as despesas e rendimentos por data
        const groupedData = filteredData.reduce((acc, curr) => {
          const existing = acc.find((item) => item.date === curr.date);
          if (existing) {
            if (curr.type === "despesa") existing.despesa += curr.value;
            if (curr.type === "rendimento") existing.rendimento += curr.value;
          } else {
            acc.push({
              date: curr.date,
              despesa: curr.type === "despesa" ? curr.value : 0,
              rendimento: curr.type === "rendimento" ? curr.value : 0,
            });
          }
          return acc;
        }, []);

        // Garantir que o gráfico comece do zero
        setChartData(groupedData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [month, year, navigate]);

  return (
    <div>
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
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="despesa"
              stroke="#FF0000"
              fill="#FF8888"
              name="Despesas"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="rendimento"
              stroke="#008000"
              fill="#88FF88"
              name="Rendimentos"
              stackId="1"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DashboardMainChart;
