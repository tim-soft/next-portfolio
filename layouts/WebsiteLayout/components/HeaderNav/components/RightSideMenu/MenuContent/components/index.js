import styled from 'styled-components';
import { darken } from 'components/AppTheme';

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const MenuList = styled.ul`
  width: inherit;
  list-style-type: none;
  padding-inline-start: unset;
  margin-block-start: unset;
  margin-block-end: unset;
`;

export const MenuListItem = styled.li`
  display: flex;
  transition: all 0.2s linear;
  transition-property: background-color, color, border-color;
  color: ${({ theme }) => theme.pageContentFontColor};
  align-items: center;
  justify-content: space-between;
  height: ${({ height }) => `${height}px` || '80px'};
  padding: 15px;
  overflow: hidden;
  border-bottom-style: solid;
  border-color: ${({ theme }) => theme.popoutMenuBorderColor};
  border-bottom-width: 1px;
  :hover {
    color: ${({ theme }) => theme.pageContentLinkHoverColor};
    background-color: ${({ theme }) => darken(theme.pageBackgroundColor)};
    cursor: pointer;
  }
`;

export const MenuFooter = styled.div`
  color: white;
  margin: 20px !important;
  line-height: 21px;
  text-align: center;
  margin-top: auto;
`;
