import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, BarChart, User, LogOut, Menu } from "lucide-react";
import "./styles/Sidebar.css"; // Importando o CSS

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Botão de alternância */}
      <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        <Menu size={24} />
      </button>

      {/* Links do Menu */}
      <nav className="menu">
        <SidebarItem to="/dashboard" icon={<Home size={24} />} text="Dashboard" collapsed={isCollapsed} />
        <SidebarItem to="/analytics" icon={<BarChart size={24} />} text="Analytics" collapsed={isCollapsed} />
        <SidebarItem to="/profile" icon={<User size={24} />} text="Perfil" collapsed={isCollapsed} />
      </nav>

      {/* Botão de Logout */}
      <SidebarItem to="/" icon={<LogOut size={24} />} text="Sair" collapsed={isCollapsed} onClick={() => localStorage.removeItem('token')} />
    </div>
  );
};

// Componente auxiliar para os itens do menu
const SidebarItem = ({ to, icon, text, collapsed, onClick }) => (
  <Link to={to} onClick={onClick} className="sidebar-item">
    {icon}
    {!collapsed && <span className="sidebar-text">{text}</span>}
  </Link>
);

export default Sidebar;
