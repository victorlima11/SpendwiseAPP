import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HistoryTransactions from "./components/HistoryTransactions";
import Sidebar from "./components/SideBar";


const Transactions = () => {
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
        <HistoryTransactions/>
      </div>
    </div>
  );
};
export default Transactions;
