import React from 'react';
import styled from 'styled-components';
import { LeftSideLogo, RightSideMenu, MobileRightSideMenu } from './components';

/**
 * Fixed top header component with main site navigation
 * Prefetches nav route links https://nextjs.org/docs#prefetching-pages
 */
export default () => (
  <HeaderStyled>
    <LeftSideLogo />

    <RightSideMenu />
    <MobileRightSideMenu />
  </HeaderStyled>
);

const HeaderStyled = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding: 15px;
  background: none;
  color: white;
  z-index: 20;
  display: flex;
  align-items: center;
  overflow: hidden;
`;
