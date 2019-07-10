import styled from 'styled-components';

export default styled.code`
  transition: all 0.2s linear;
  transition-property: color, background-color;
  background-color: ${({ theme }) => theme.accentColor};
  color: ${({ theme }) => theme.pageContentFontColor};
  padding: 1px 6px;
`;
