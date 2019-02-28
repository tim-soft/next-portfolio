import styled from 'styled-components';

export default styled.button`
  background: none;
  border-style: none;
  font-size: 50px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  color: white;
  transition: color 0.2s linear;
  :hover {
    color: grey;
  }
  :focus {
    outline: none;
  }
`;
