import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'components/AppTheme';

const BlogQuote = ({ children }) => <StyledQuote>{children}</StyledQuote>;

BlogQuote.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default BlogQuote;

const StyledQuote = styled.q`
  transition: all 0.2s linear;
  transition-property: background-color, border-left-color, color;
  background-color: ${({ theme }) => lighten(theme.pageBackgroundColor)};
  border-left-color: ${({ theme }) => theme.pageContentLinkHoverColor};
  border-left-width: 3px;
  border-left-style: solid;
  display: flex;
  flex-direction: column;
  padding: 18px 20px;
  font-size: 1.2em;
  line-height: 1.5em;
  margin: 2em 0;
  :before {
    content: no-open-quote;
  }
  :after {
    content: no-close-quote;
  }
  > :not(:last-child) {
    margin-bottom: 1.2em;
  }
`;
