// src/pages/Historico.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './transactions.css';

function Transactions() {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Pegue todas as transações (despesas e rendimentos)
        const despesasResponse = await axios.get('http://localhost:8000/users/despesas/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const rendimentosResponse = await axios.get('http://localhost:8000/users/rendimentos/', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Combine as despesas e rendimentos em um único array
        const allTransacoes = [...despesasResponse.data, ...rendimentosResponse.data];
        setTransacoes(allTransacoes);
      } catch (error) {
        console.error('Erro ao carregar transações:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransacoes();
  }, []);

  const handleDelete = (id) => {
    // Lógica para excluir a transação
    // Implementação do Axios para deletar a transação
    console.log(`Excluir transação com ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Lógica para editar a transação
    // Isso pode redirecionar para um formulário de edição
    console.log(`Editar transação com ID: ${id}`);
  };

  return (
    <div className="historico-container">
      <h1>Histórico de Transações</h1>

      {loading ? (
        <p>Carregando transações...</p>
      ) : (
        <div className="transacoes-list">
          {transacoes.map((transacao) => (
            <div className="transacao-card" key={transacao.id}>
              <h3>{transacao.category}</h3>
              <p>{transacao.description || 'Sem descrição'}</p>
              <p>{transacao.amount < 0 ? `R$ ${Math.abs(transacao.amount).toFixed(2)} (Despesa)` : `R$ ${transacao.amount.toFixed(2)} (Rendimento)`}</p>
              <div className="buttons">
                <button onClick={() => handleEdit(transacao.id)}>Editar</button>
                <button onClick={() => handleDelete(transacao.id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Transactions;
