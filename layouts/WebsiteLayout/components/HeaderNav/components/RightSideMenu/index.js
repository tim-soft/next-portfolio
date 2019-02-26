import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import StyledLink from '../StyledLink';

export default () => (
  <RightSideMenu>
    <Link prefetch href="/portfolio">
      <StyledLink>Portfolio</StyledLink>
    </Link>

    <Link prefetch href="/contact">
      <StyledLink>Contact</StyledLink>
    </Link>

    <Link prefetch href="/store">
      <StyledLink>Store</StyledLink>
    </Link>

    <Link prefetch href="/blog">
      <StyledLink>Blog</StyledLink>
    </Link>
  </RightSideMenu>
);

const RightSideMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1060px) {
    display: none;
  }
`;
