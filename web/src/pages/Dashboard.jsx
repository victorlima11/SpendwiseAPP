import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './components/styles/dashboard.css';
import Sidebar from './components/SideBar';
import DashboardMainChart from './components/DashboardMainChart';
import RadarChartComponent from './components/RadarChartComponent';
import DashboardCards from './components/DashboardCards';
import DespesasCard from './components/DespesasCard';
import RendimentosCard from './components/RendimentosCard';
import AssinaturasCard from './components/AssinaturasCard';
import ResumoMes from './components/ResumoMes';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  return (
    <div className='main'>
      <Sidebar />
      <div className='dashboard-container'>
        <h1>Dashboard</h1>
        <p>Bem-vindo ao painel!</p>
        <DashboardCards />
        <div className='dashboard-main'>
        <DashboardMainChart />
        <ResumoMes />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
