import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./components/styles/addTransactionPage.css";
import AddTransaction from "./components/AddTransaction";
import Sidebar from "./components/SideBar";
import "./components/styles/sideBar.css"; 

const AddTransactionPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="add-container">
      <Sidebar />
      <div className="add-content">
        <AddTransaction />
      </div>
    </div>
  );
};

export default AddTransactionPage;
