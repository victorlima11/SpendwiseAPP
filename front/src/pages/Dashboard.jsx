import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';
import Sidebar from './components/SideBar';
import DashboardMainChart from './components/DashboardMainChart';
import RadarChartComponent from './components/RadarChartComponent';


function Dashboard() {
  const navigate = useNavigate(); // Usado para redirecionar

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtém o token JWT do localStorage ou onde você armazenar o token

    if (!token) {
      // Se não houver token, redireciona para a página de login
      navigate('/login');
      return; // Evita continuar a execução do código
    }
  }, [navigate]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", color: "white", background: "#181818" }}>
        <h1>Dashboard</h1>
        <p>Bem-vindo ao painel!</p>
        <DashboardMainChart />
        <RadarChartComponent />
      </div>
    </div>
  );
};

export default Dashboard;
