import { useEffect, useState } from "react";
import axios from "axios";
import HistoryTransactions from "./components/HistoryTransactions";
import Sidebar from "./components/SideBar";


const Transactions = () => {
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
