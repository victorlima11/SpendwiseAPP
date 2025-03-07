import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Filler } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function Dashboard() {
  const [despesas, setDespesas] = useState([]);
  const [rendimentos, setRendimentos] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Usado para redirecionar

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtém o token JWT do localStorage ou onde você armazenar o token

    if (!token) {
      // Se não houver token, redireciona para a página de login
      navigate('/login');
      return; // Evita continuar a execução do código
    }

    const fetchData = async () => {
      try {
        // Fetch despesas, rendimentos, e saldo
        const despesasResponse = await axios.get('http://localhost:8000/users/despesas/', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const rendimentosResponse = await axios.get('http://localhost:8000/users/rendimentos/', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const saldoResponse = await axios.get('http://localhost:8000/users/saldo/', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setDespesas(despesasResponse.data);
        setRendimentos(rendimentosResponse.data);
        setSaldo(saldoResponse.data.saldo);
      } catch (error) {
        console.error('Erro ao carregar dados:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]); // Adiciona `navigate` como dependência para garantir que a navegação seja verificada corretamente

  // Dados para gráfico de Despesas
  const despesaData = {
    labels: despesas.map(despesa => despesa.date),
    datasets: [{
      label: 'Despesas',
      data: despesas.map(despesa => despesa.amount),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
    }],
  };

  // Dados para gráfico de Rendimentos
  const rendimentoData = {
    labels: rendimentos.map(rendimento => rendimento.date),
    datasets: [{
      label: 'Rendimentos',
      data: rendimentos.map(rendimento => rendimento.amount),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    }],
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Spendwise</div>
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/settings">Configurações</Link>
          <Link to="/logout" className="logout-button">Sair</Link>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <h1>Bem-vindo ao seu Painel</h1>
        <p>Acompanhe seus gastos e controle suas finanças de forma simples e eficiente.</p>

        <div className="cards-container">
          <div className="card">
            <h3>Saldo Atual</h3>
            <p>R$ {saldo.toFixed(2)}</p>
          </div>

          <div className="card">
            <h3>Despesas Mensais</h3>
            <p>R$ {despesas.reduce((acc, despesa) => acc + despesa.amount, 0).toFixed(2)}</p>
          </div>

          <div className="card">
            <h3>Meta de Economia</h3>
            <p>R$ 10.000,00</p>
          </div>
        </div>

        {/* Loading indicator */}
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="charts-container">
            <div className="chart-card">
              <h3>Despesas ao Longo do Tempo</h3>
              <Line data={despesaData} options={{ responsive: true }} />
            </div>

            <div className="chart-card">
              <h3>Rendimentos ao Longo do Tempo</h3>
              <Line data={rendimentoData} options={{ responsive: true }} />
            </div>
          </div>
        )}

        <div className="buttons">
          <button className="button-add">
            <Link to="/transactions">Histórico de Transações</Link>
          </button>
          <button className="button-add">
            <Link to="/addTransaction">Adicionar Transação</Link>
          </button>
          <button className="button-report">Gerar Relatório</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
