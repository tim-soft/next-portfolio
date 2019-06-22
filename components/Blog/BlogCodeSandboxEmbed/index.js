import styled from 'styled-components';

export default styled.iframe`
  width: 100%;
  max-width: ${({ theme }) => theme.pageContentWidth}px;
  height: 600px;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
`;
