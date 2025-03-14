import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, User, LogOut, Menu, History, Settings, CirclePlus, FileText } from "lucide-react";
import "./styles/Sidebar.css";
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        <Menu size={24} />
      </button>
      <nav className="menu-sidebar">
        <SidebarItem to="/dashboard" icon={<Home size={24} />} text="Dashboard" collapsed={isCollapsed} />
        <SidebarItem to="/history" icon={<History size={24} />} text="Histórico" collapsed={isCollapsed} />
        <SidebarItem icon={<Settings size={24} />} text="Configurações" collapsed={isCollapsed} />
        <SidebarItem to="/trasactions/add" icon={<CirclePlus size={24} />} text="Adicionar" collapsed={isCollapsed} />
        <SidebarItem to="/record" icon={<FileText size={24} />} text="Relatório" collapsed={isCollapsed} />
        <SidebarItem to="/profile" icon={<User size={24} />} text="Perfil" collapsed={isCollapsed} />
      </nav>
      <SidebarItem to="/" icon={<LogOut size={24} />} text="Sair" collapsed={isCollapsed} onClick={() => localStorage.removeItem('token')} />
    </div>
  );
};

const SidebarItem = ({ to, icon, text, collapsed, onClick }) => (
  <Link to={to} onClick={onClick} className="sidebar-item">
    {icon}
    {!collapsed && <span className="sidebar-text">{text}</span>}
  </Link>
);

export default Sidebar;
