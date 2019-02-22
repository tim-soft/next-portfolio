import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: purple;
  font-size: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
  background: darkgray;
`;

export default () => (
  <Container>
    <Title>Store</Title>
  </Container>
);
