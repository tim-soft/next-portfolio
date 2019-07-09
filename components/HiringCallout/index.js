import styled from 'styled-components';

const HiringCallout = props => (
  <Header {...props}>
    <a href="mailto:timellenberger@gmail.com">
      Need a developer? Drop me a line!
    </a>
  </Header>
);

export default HiringCallout;

const Header = styled.h2`
  margin: 2em 0 1em 0;
  font-size: 1.2em;
  font-weight: normal;
  text-decoration: underline;
  text-align: center;
  a {
    transition: color 0.2s linear;
    color: ${({ theme }) => theme.pageContentLinkHoverColor};
    :hover {
      cursor: pointer;
      color: ${({ theme }) => theme.pageContentFontColor};
    }
  }
`;
