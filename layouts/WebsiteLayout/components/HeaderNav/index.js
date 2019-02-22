import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderStyled = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding: 15px;
  background: none;
  color: white;
  z-index: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const RightSideMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StyledLink = styled.a`
  position: relative;
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-size: 2em;
  margin: 0 20px;
  padding: 15px 0;
  transition: color 0.2s linear;
  :hover {
    cursor: pointer;
    color: #ff6054;
  }
  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 105%;
    height: 3px;
    width: 100%;
    background-color: cyan;
    -webkit-transform-origin: center top;
    transform-origin: center top;
    -webkit-transform: scale(0, 1);
    transform: scale(0, 1);
    transition: color 0.1s, -webkit-transform 0.2s ease-out;
    transition: color 0.1s, transform 0.2s ease-out;
    transition: color 0.1s, transform 0.2s ease-out,
      -webkit-transform 0.2s ease-out;
  }
  :active::before {
    background-color: cyan;
  }
  :focus::before,
  :hover::before {
    -webkit-transform-origin: center top;
    transform-origin: center top;
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
`;

export default () => (
  <HeaderStyled>
    <Link href="/">
      <StyledLink>Logo...</StyledLink>
    </Link>

    <RightSideMenu>
      <Link href="/portfolio">
        <StyledLink>Portfolio</StyledLink>
      </Link>

      <Link href="/contact">
        <StyledLink>Contact</StyledLink>
      </Link>

      <Link href="/store">
        <StyledLink>Store</StyledLink>
      </Link>

      <Link href="/blog">
        <StyledLink>Blog</StyledLink>
      </Link>
    </RightSideMenu>
  </HeaderStyled>
);
