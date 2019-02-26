import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import StyledLogo from '../StyledLink';

export default () => (
  <Link prefetch href="/">
    <Logo>Tim Ellenberger</Logo>
  </Link>
);

const Logo = styled(StyledLogo)`
  z-index: 21;
  color: ${({ theme }) => theme.headerNavMobileMenuFontColor};
`;
