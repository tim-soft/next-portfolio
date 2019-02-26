import styled from 'styled-components';

export default styled.a`
  position: relative;
  font-family: 'Montserrat', sans-serif;
  white-space: nowrap;
  color: white;
  font-size: 2em;
  margin: 0 20px;
  padding: 15px 0;
  transition: color 0.2s linear;
  :hover {
    cursor: pointer;
    color: #ff6054;
  }
  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 105%;
    height: 3px;
    width: 100%;
    background-color: cyan;
    -webkit-transform-origin: center top;
    transform-origin: center top;
    -webkit-transform: scale(0, 1);
    transform: scale(0, 1);
    transition: color 0.1s, -webkit-transform 0.2s ease-out;
    transition: color 0.1s, transform 0.2s ease-out;
    transition: color 0.1s, transform 0.2s ease-out,
      -webkit-transform 0.2s ease-out;
  }
  :active::before {
    background-color: cyan;
  }
  :focus::before,
  :hover::before {
    -webkit-transform-origin: center top;
    transform-origin: center top;
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
`;
