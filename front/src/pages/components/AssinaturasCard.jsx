import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssinaturasCard = () => {
  const [assinaturasInfo, setAssinaturasInfo] = useState({
    total_gasto: 0,
    total_assinaturas: 0,
  });

  useEffect(() => {
    const fetchAssinaturasInfo = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Ou a forma como você armazena o token
        const response = await axios.get("http://localhost:8000/users/assinaturas/info/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAssinaturasInfo(response.data);
      } catch (error) {
        console.error("Erro ao buscar informações de assinaturas", error);
      }
    };

    fetchAssinaturasInfo();
  }, []);

  return (
    <div className="card">
      <h3>Assinaturas</h3>
      <p>Total gasto com assinaturas: R${assinaturasInfo.total_gasto.toFixed(2)}</p>
      <p>Número de assinaturas ativas: {assinaturasInfo.total_assinaturas}</p>
    </div>
  );
};

export default AssinaturasCard;
