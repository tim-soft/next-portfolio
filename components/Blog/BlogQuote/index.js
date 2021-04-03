import PropTypes from 'prop-types';
import styled from 'styled-components';

const BlogQuote = ({ children, ...props }) => (
    <StyledQuote {...props}>{children}</StyledQuote>
);

BlogQuote.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default BlogQuote;

const StyledQuote = styled.aside`
    transition: all 0.2s linear;
    transition-property: background-color, border-left-color, color;
    background-color: ${({ theme }) => theme.accentColor};
    border-left-color: ${({ theme }) => theme.pageContentLinkHoverColor};
    border-left-width: 3px;
    border-left-style: solid;
    display: flex;
    flex-direction: column;
    padding: 18px 20px;
    font-size: 1.2em;
    line-height: 1.5em;
    margin: 2em 0;
    > :not(:last-child) {
        margin-bottom: 1.2em;
    }
`;
