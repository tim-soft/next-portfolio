import styled from 'styled-components';
import Color from 'color';

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
  color: ${({ theme }) => theme.pageContentFontColor};
  align-items: center;
  justify-content: space-between;
  height: ${({ height }) => `${height}px` || '80px'};
  padding: 15px;
  overflow: hidden;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 1px;
  transition: all 0.3s linear;
  transition-property: color, background-color;
  :hover {
    color: ${({ theme }) => theme.pageContentLinkHoverColor};
    background-color: ${({ theme }) => {
      // Calculate a hover color lighter or darker than background
      // based on how bright the background color is
      const color = Color(theme.pageBackgroundColor);
      const luminosity = color.luminosity();

      if (luminosity < 0.3)
        return Color(theme.pageBackgroundColor)
          .darken(0.05)
          .hex();

      return Color(theme.pageBackgroundColor)
        .lighten(0.1)
        .hex();
    }};
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
