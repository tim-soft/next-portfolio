import styled from 'styled-components';
import LinkWrapper from './LinkWrapper';

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
    height: ${({ height }) => (height ? `${height}px` : 'auto')};
    overflow: hidden;
    border-bottom-style: solid;
    border-color: ${({ theme }) => theme.popoutMenuBorderColor};
    border-bottom-width: 1px;
    :hover {
        color: ${({ theme }) => theme.pageContentLinkHoverColor};
        background-color: ${({ theme }) => theme.accentHoverColor};
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

export const MenuHeader = styled.div`
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.popoutMenuBorderColor};
    padding: 20px;
    text-align: center;
    background-color: #f44336;
    color: white;
`;

export { LinkWrapper };
