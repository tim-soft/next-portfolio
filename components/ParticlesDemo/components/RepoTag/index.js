import React from 'react';
import styled from 'styled-components';

export default () => (
  <Container>
    <StyledLink
      href="https://github.com/tim-soft/react-particles-webgl#readme"
      target="__blank"
    >
      <Text>react-particles-webgl</Text>
      <ShieldContainer>
        <NpmShield
          alt="npm"
          src="https://img.shields.io/npm/v/react-particles-webgl.svg?color=brightgreen&style=popout-square"
        />
        <NpmShield
          alt="NPM"
          src="https://img.shields.io/npm/l/react-particles-webgl.svg?color=brightgreen&style=popout-square"
        />
      </ShieldContainer>
    </StyledLink>
  </Container>
);

const Container = styled.div`
  position: absolute;
  bottom: 20px;
  width: auto;
  background: #1a1a1ad4;

  @media (max-width: 512px) {
    display: none;
  }
`;

const StyledLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 10px;
`;

const Text = styled.h3`
  color: #eeeeee;
  margin: 0;
  font-weight: normal;
  margin-bottom: 5px;
`;

const ShieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const NpmShield = styled.img`
  margin: 5px;
`;
