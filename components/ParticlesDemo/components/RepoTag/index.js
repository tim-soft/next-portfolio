import React from 'react';
import styled from 'styled-components';
import { DiGithubBadge } from 'react-icons/di';

export default () => (
  <Container>
    <StyledLink
      href="https://github.com/tim-soft/react-particles-webgl#readme"
      target="__blank"
    >
      <RepoTitleContainer>
        <Text>react-particles-webgl</Text>
        <DiGithubBadge size="2.5em" />
      </RepoTitleContainer>

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
  color: #eeeeee;
  border: 1px solid #1a1a1ad4;
  transition: all 0.3s linear;
  transition-property: color, border;
  :hover {
    color: cyan;
    border: 1px solid cyan;
  }

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
  color: inherit;
`;

const Text = styled.h3`
  margin: 0;
  font-weight: normal;
`;

const RepoTitleContainer = styled.div`
  display: flex;
  align-items: center;
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
