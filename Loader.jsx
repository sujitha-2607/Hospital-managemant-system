import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return <Spinner />;
};

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid rgb(57, 105, 111); /* Matches button-navig background */
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: auto;

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