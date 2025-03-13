import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Filler } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from './components/SideBar';

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
  }, [navigate]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", color: "white", background: "#181818" }}>
        <h1>Dashboard</h1>
        <p>Bem-vindo ao painel!</p>
      </div>
    </div>
  );
};

export default Dashboard;
