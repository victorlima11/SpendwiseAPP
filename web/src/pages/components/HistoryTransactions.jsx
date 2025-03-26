import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import "./styles/historyTransactions.css";

const HistoryTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const params = { month, year };
        const [despesasRes, rendimentosRes] = await Promise.all([
          axios.get("https://spendwiseapp.onrender.com/users/despesas/", {
            headers: { Authorization: `Bearer ${token}` },
            params,
          }),
          axios.get("https://spendwiseapp.onrender.com/users/rendimentos/", {
            headers: { Authorization: `Bearer ${token}` },
            params,
          }),
        ]);

        setTransactions([
          ...despesasRes.data.map((item) => ({ ...item, type: "Despesa" })),
          ...rendimentosRes.data.map((item) => ({ ...item, type: "Rendimento" })),
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };

    fetchData();
  }, [month, year]);

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://spendwiseapp.onrender.com/users/${selectedTransaction.type.toLowerCase()}s/${selectedTransaction.id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions(transactions.filter((t) => t.id !== selectedTransaction.id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Erro ao excluir transação", error);
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === "all" || transaction.type.toLowerCase() === filter;
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://spendwiseapp.onrender.com/users/${selectedTransaction.type.toLowerCase()}s/${selectedTransaction.id}/`,
        selectedTransaction,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions(
        transactions.map((t) =>
          t.id === selectedTransaction.id ? selectedTransaction : t
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar transação", error);
    }
  };

  return (
    <div className="transactions-container">
      <h2 className="transactions-header">Histórico de Transações</h2>
      <div className="filters-container">
        <input
          type="text"
          placeholder="Buscar transação..."
          className="filter-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className={`filter-button ${filter === "all" ? "selected" : ""}`}
          onClick={() => handleFilterChange("all")}
        >
          Todos
        </button>
        <button
          className={`filter-button ${filter === "despesa" ? "selected" : ""}`}
          onClick={() => handleFilterChange("despesa")}
        >
          Despesas
        </button>
        <button
          className={`filter-button ${filter === "rendimento" ? "selected" : ""}`}
          onClick={() => handleFilterChange("rendimento")}
        >
          Rendimentos
        </button>
        <input
          type="month"
          value={month}
          className="filter-input"
          onChange={(e) => setMonth(e.target.value)}
        />
        <input
          type="number"
          value={year}
          className="filter-input"
          onChange={(e) => setYear(e.target.value)}
          placeholder="Filtrar por valor"
        />
      </div>

      <div className="transaction-cards-container">
        {filteredTransactions.map((transaction) => (
          <div className="transaction-card" key={transaction.id}>
            <div className="transaction-card-header">
              <h3>{transaction.description}</h3>
              <div className="transaction-card-icons">
                <Pencil className="icon" onClick={() => handleEditClick(transaction)} />
                <Trash2 className="icon" onClick={() => handleDeleteClick(transaction)} />
              </div>
            </div>
            <div className="transaction-card-body">
              <p><strong>Valor:</strong> R$ {transaction.amount.toFixed(2)}</p>
              <p><strong>Categoria:</strong> {transaction.category}</p>
              <p><strong>Tipo:</strong> {transaction.type}</p>
              <p><strong>Data:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="transaction-modal">
          <div className="modal-content">
            <h2>Editar Transação</h2>
            <input
              type="text"
              className="modal-input"
              value={selectedTransaction.description}
              onChange={(e) =>
                setSelectedTransaction({ ...selectedTransaction, description: e.target.value })
              }
            />
            <input
              type="number"
              className="modal-input"
              value={selectedTransaction.amount}
              onChange={(e) =>
                setSelectedTransaction({ ...selectedTransaction, amount: parseFloat(e.target.value) })
              }
            />
            <input
              type="text"
              className="modal-input"
              value={selectedTransaction.category}
              onChange={(e) =>
                setSelectedTransaction({ ...selectedTransaction, category: e.target.value })
              }
            />
            <input
              type="date"
              className="modal-input"
              value={selectedTransaction.date}
              onChange={(e) =>
                setSelectedTransaction({ ...selectedTransaction, date: e.target.value })
              }
            />
            <div className="modal-actions">
              <button onClick={handleUpdate}>Salvar</button>
              <button onClick={() => setIsModalOpen(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="delete-modal">
          <div className="modal-content">
            <h2>Tem certeza que deseja excluir esta transação?</h2>
            <div className="modal-actions">
              <button onClick={handleDelete}>Sim</button>
              <button onClick={() => setIsDeleteModalOpen(false)}>Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryTransactions;
