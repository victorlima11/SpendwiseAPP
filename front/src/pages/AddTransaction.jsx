import React, { useState } from 'react';
import axios from 'axios';
import './addTransaction.css';

function AddTransaction() {
  const [tipo, setTipo] = useState('despesa'); // Valor inicial é 'despesa'
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se todos os campos estão preenchidos
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
      // Determinar a URL com base no tipo (despesa ou rendimento)
      const url = tipo === 'despesa' ? 'http://localhost:8000/users/despesas/' : 'http://localhost:8000/users/rendimentos/';

      // Enviar os dados da transação para a API
      await axios.post(url, transactionData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Resetar os campos do formulário após o envio
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
    <div className="add-transaction-container">
      <h1>Adicionar Transação</h1>
      <form onSubmit={handleSubmit}>
        {/* Tipo de Transação: Despesa ou Rendimento */}
        <div className="input-group">
          <label>Tipo de Transação:</label>
          <div>
            <label>
              <input 
                type="radio" 
                name="tipo" 
                value="despesa" 
                checked={tipo === 'despesa'} 
                onChange={() => setTipo('despesa')} 
              />
              Despesa
            </label>
            <label>
              <input 
                type="radio" 
                name="tipo" 
                value="rendimento" 
                checked={tipo === 'rendimento'} 
                onChange={() => setTipo('rendimento')} 
              />
              Rendimento
            </label>
          </div>
        </div>

        {/* Montante */}
        <div className="input-group">
          <label>Montante:</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Valor da transação"
          />
        </div>

        {/* Categoria */}
        <div className="input-group">
          <label>Categoria:</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            placeholder="Ex: Alimentação, Salário"
          />
        </div>

        {/* Descrição */}
        <div className="input-group">
          <label>Descrição (opcional):</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Ex: Compra no supermercado"
          />
        </div>

        {/* Data */}
        <div className="input-group">
          <label>Data:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>

        {/* Erro de validação */}
        {error && <p className="error">{error}</p>}

        {/* Botão para enviar a transação */}
        <button type="submit" className="button-submit">Adicionar Transação</button>
      </form>
    </div>
  );
}

export default AddTransaction;
