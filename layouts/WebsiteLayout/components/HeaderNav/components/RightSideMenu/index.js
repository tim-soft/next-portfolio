import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import StyledLink from '../StyledLink';

export default () => (
  <RightSideMenu>
    <Link prefetch href="/portfolio">
      <StyledLink>Portfolio</StyledLink>
    </Link>

    <Link prefetch href="/particles">
      <StyledLink>ParticlesGL</StyledLink>
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
  @media (${({ theme }) => theme.breakpoints.desktopNav}) {
    display: none;
  }
`;
