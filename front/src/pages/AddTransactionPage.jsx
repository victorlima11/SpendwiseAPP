import React from "react";
import "./components/styles/addTransactionPage.css";
import AddTransaction from "./components/AddTransaction";
import Sidebar from "./components/SideBar";
import "./components/styles/sideBar.css"; 

const AddTransactionPage = () => {
  return (
    <div className="add-container">
      <Sidebar />
      <div className="add-content">
        <AddTransaction/>
      </div>
    </div>
  );
};

export default AddTransactionPage;
