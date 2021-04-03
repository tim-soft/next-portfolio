import PropTypes from 'prop-types';
import styled from 'styled-components';
import BlogQuote from '../BlogQuote';

const BlogTableOfContents = ({ children, ...props }) => (
    <AsideContainer {...props}>{children}</AsideContainer>
);

BlogTableOfContents.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default BlogTableOfContents;

const AsideContainer = styled(BlogQuote)`
    > {
        ul {
            list-style-type: none;
            li {
                list-style-type: none;
            }
        }
    }
`;
