import PropTypes from 'prop-types';
import styled from 'styled-components';

const BlogList = ({ children, ...props }) => (
    <StyledList {...props}>{children}</StyledList>
);

BlogList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    listStyle: PropTypes.string,
};

BlogList.defaultProps = {
    listStyle: 'decimal',
};

export default BlogList;

const StyledList = styled.ul`
    transition: color 0.2s linear;
    font-size: 1.2em;
    color: ${({ theme }) => theme.pageContentFontColor};
    list-style-type: ${({ listStyle }) => listStyle};

    li:not(:last-child) {
        margin-bottom: 8px;
    }
`;
