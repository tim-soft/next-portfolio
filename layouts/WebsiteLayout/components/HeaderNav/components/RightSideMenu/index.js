import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import StyledLink from '../StyledLink';

export default () => (
  <RightSideMenu>
    <Link prefetch href="/portfolio">
      <StyledLink>
        <LinkHeading>Portfolio</LinkHeading>
      </StyledLink>
    </Link>

    <Link prefetch href="/particles">
      <StyledLink>
        <LinkHeading>ParticlesGL</LinkHeading>
      </StyledLink>
    </Link>

    <Link prefetch href="/courses">
      <StyledLink>
        <LinkHeading>Courses</LinkHeading>
      </StyledLink>
    </Link>

    <Link prefetch href="/blog">
      <StyledLink>
        <LinkHeading>Blog</LinkHeading>
      </StyledLink>
    </Link>
  </RightSideMenu>
);

const LinkHeading = styled.h1`
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
`;

const RightSideMenu = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media (${({ theme }) => theme.breakpoints.desktopNav}) {
    display: none;
  }
`;
