import React from 'react';
import styled from 'styled-components';
import { GoMarkGithub, GoCode } from 'react-icons/go';

const Footer = () => (
  <StyledFooter>
    <StyledHeader>react-spring-lightbox</StyledHeader>
    <LinkContainer>
      <StyledLink
        href="https://github.com/tim-soft/react-spring-lightbox"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GoMarkGithub size="1.5em" />
        GitHub
      </StyledLink>
      <StyledLink
        href="https://codesandbox.io/s/react-spring-lightbox-mosaic-71hts?fontsize=14&module=%2Fsrc%2FImageGallery%2Findex.js"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GoCode size="1.5em" />
        Codesandbox
      </StyledLink>
    </LinkContainer>
    <LinkContainer>
      <StyledLink
        href="https://timellenberger.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://timellenberger.com
      </StyledLink>
    </LinkContainer>
  </StyledFooter>
);

export default Footer;

const StyledHeader = styled.h2`
  margin: 20px 0;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 20px 0;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.pageContentFontColor};
  margin: 0 5px;
  :hover {
    color: ${({ theme }) => theme.pageContentLinkHoverColor};
  }
  svg {
    margin-right: 5px;
  }
`;

const StyledFooter = styled.footer`
  font-size: 1.1em;
  position: absolute;
  padding: 0px 20px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.pageBackgroundColor};
  color: ${({ theme }) => theme.pageContentFontColor};
  border-color: ${({ theme }) => theme.pageContentLinkHoverColor};
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
`;
