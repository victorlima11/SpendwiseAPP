import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader"></div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Ocupa toda a altura do contêiner */
  width: 100%; /* Ocupa toda a largura do contêiner */
  
  .loader {
    border: 10px solid #f3f3f3; /* Cor de fundo do círculo */
    border-top: 10px solid #3498db; /* Cor do círculo animado */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
