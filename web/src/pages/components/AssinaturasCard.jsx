import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/cardAssinatura.css';

const AssinaturasCard = () => {
  const [assinaturasInfo, setAssinaturasInfo] = useState({
    total_gasto: 0,
    total_assinaturas: 0,
  });
  const [totalAssinaturas, setTotalAssinaturas] = useState(0);

  useEffect(() => {
    const fetchAssinaturasInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://spendwiseapp.onrender.com/users/assinaturas/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAssinaturasInfo(response.data);
      } catch (error) {
        console.error("Erro ao buscar informações de assinaturas", error);
      }
    };

    const fetchAssinaturasCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://spendwiseapp.onrender.com/users/me/assinaturas/count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalAssinaturas(response.data.count);
      } catch (error) {
        console.error("Erro ao contar as assinaturas", error);
      }
    };

    fetchAssinaturasInfo();
    fetchAssinaturasCount();
  }, []);

  return (
    <div className="card-assinatura">
      <h3>Assinaturas</h3>
      <p>Total gasto com assinaturas: R${assinaturasInfo.total_gasto ? assinaturasInfo.total_gasto.toFixed(2) : "0.00"}</p>
      <p>Número de assinaturas ativas: {totalAssinaturas}</p>
    </div>
  );
};

export default AssinaturasCard;
