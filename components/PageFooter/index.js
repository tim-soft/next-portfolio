import styled from 'styled-components';
import { GoMarkGithub, GoMail } from 'react-icons/go';
import { BlogLink } from '../Blog';
import HiringCallout from '../HiringCallout';

const PageFooter = props => (
  <Footer {...props}>
    <HiringCallout />
    <FooterLinkContainer style={{ display: 'flex' }}>
      <StyledLink href="https://github.com/tim-soft" paragraph>
        <GoMarkGithub size="2em" />
        <h3>tim-soft</h3>
      </StyledLink>

      <StyledLink href="mailto:timellenberger@gmail.com" paragraph>
        <GoMail size="2em" />
        <h3>email</h3>
      </StyledLink>
    </FooterLinkContainer>
  </Footer>
);

export default PageFooter;

const StyledLink = styled(BlogLink)`
  display: flex;
  align-items: center;
  > h3 {
    font-weight: normal;
    font-size: 1em;
    margin: 0;
  }
  > svg {
    margin-right: 0.4em;
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  > h2 {
    margin-top: 0;
    margin-bottom: 1.2em;
  }
`;

const FooterLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 320px;
  width: 100%;
`;
