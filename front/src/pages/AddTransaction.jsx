import React, { useState } from 'react';
import axios from 'axios';

function AddTransactionModal({ showModal, closeModal }) {
  const [tipo, setTipo] = useState('despesa');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

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
      closeModal();
    } catch (error) {
      setError('Ocorreu um erro ao adicionar a transação. Tente novamente.');
    }
  };

  return (
    showModal && (
      <div className="modal-overlay">
        <div className="modal-container">
          <button className="modal-close-button" onClick={closeModal}>X</button>
          <h2 className="modal-title">Adicionar Transação</h2>
          <form onSubmit={handleSubmit} className="add-transaction-form">
            <div className="add-transaction-input-group">
              <label className="add-transaction-label">Tipo de Transação:</label>
              <div className="add-transaction-radio-group">
                <label className="add-transaction-radio-label">
                  <input 
                    type="radio" 
                    name="tipo" 
                    value="despesa" 
                    checked={tipo === 'despesa'} 
                    onChange={() => setTipo('despesa')} 
                    className="add-transaction-radio-input"
                  />
                  Despesa
                </label>
                <label className="add-transaction-radio-label">
                  <input 
                    type="radio" 
                    name="tipo" 
                    value="rendimento" 
                    checked={tipo === 'rendimento'} 
                    onChange={() => setTipo('rendimento')} 
                    className="add-transaction-radio-input"
                  />
                  Rendimento
                </label>
              </div>
            </div>

            <div className="add-transaction-input-group">
              <label className="add-transaction-label">Montante:</label>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Valor da transação"
                className="add-transaction-input"
              />
            </div>

            <div className="add-transaction-input-group">
              <label className="add-transaction-label">Categoria:</label>
              <input 
                type="text" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                placeholder="Ex: Alimentação, Salário"
                className="add-transaction-input"
              />
            </div>

            <div className="add-transaction-input-group">
              <label className="add-transaction-label">Descrição (opcional):</label>
              <input 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Ex: Compra no supermercado"
                className="add-transaction-input"
              />
            </div>

            <div className="add-transaction-input-group">
              <label className="add-transaction-label">Data:</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="add-transaction-input"
              />
            </div>

            {error && <p className="add-transaction-error">{error}</p>}

            <button type="submit" className="add-transaction-submit-button">Adicionar Transação</button>
          </form>
        </div>
      </div>
    )
  );
}

export default AddTransactionModal;
