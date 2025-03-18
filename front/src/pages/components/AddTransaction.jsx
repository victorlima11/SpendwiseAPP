import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles/addTransaction.css";

function AddTransaction() {
  const [tipo, setTipo] = useState('despesa');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Animação ao abrir o modal
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const transactionData = {
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    try {
      const url = tipo === 'despesa' ? 'http://localhost:8000/users/despesas/' : 'http://localhost:8000/users/rendimentos/';
      
      await axios.post(url, transactionData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setAmount('');
      setCategory('');
      setDescription('');
      setDate('');
      setError('');
      alert('Transação adicionada com sucesso!');
    } catch (error) {
      setError('Ocorreu um erro ao adicionar a transação. Tente novamente.');
    }
  };

  return (
    <div className={`modal-container ${isVisible ? 'visible' : ''}`}>
      <h2 className="modal-title">Adicionar Transação</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="modal-input-group">
          <label className="modal-label">Tipo de Transação:</label>
          <div className="modal-radio-group">
            <label className="modal-radio-label">
              <input 
                type="radio" 
                name="tipo" 
                value="despesa" 
                checked={tipo === 'despesa'} 
                onChange={() => setTipo('despesa')} 
                className="modal-radio-input"
              />
              Despesa
            </label>
            <label className="modal-radio-label">
              <input 
                type="radio" 
                name="tipo" 
                value="rendimento" 
                checked={tipo === 'rendimento'} 
                onChange={() => setTipo('rendimento')} 
                className="modal-radio-input"
              />
              Rendimento
            </label>
          </div>
        </div>

        <div className="modal-input-group">
          <label className="modal-label">Montante:</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Valor da transação"
            className="modal-input"
          />
        </div>

        <div className="modal-input-group">
          <label className="modal-label">Categoria:</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            placeholder="Ex: Alimentação, Salário"
            className="modal-input"
          />
        </div>

        <div className="modal-input-group">
          <label className="modal-label">Descrição (opcional):</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Ex: Compra no supermercado"
            className="modal-input"
          />
        </div>

        <div className="modal-input-group">
          <label className="modal-label">Data:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="modal-input"
          />
        </div>

        {error && <p className="modal-error">{error}</p>}

        <button type="submit" className="modal-submit-button">Adicionar Transação</button>
      </form>
    </div>
  );
}

export default AddTransaction;