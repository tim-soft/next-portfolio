import PropTypes from 'prop-types';
import styled from 'styled-components';

import BlogSectionHeading from '../BlogSectionHeading';

const BlogDemoContainer = ({ heading, subheading, children }) => (
    <Container>
        {/* Heading is optional */}
        {heading && (
            <Heading>
                <span role="img" aria-label="lit">
                    🔥
                </span>{' '}
                {heading}{' '}
                <span role="img" aria-label="lit">
                    🔥
                </span>{' '}
            </Heading>
        )}

        {/* Subheading is optional */}
        {subheading && <SubHeading>{subheading}</SubHeading>}

        <DemoContainer>{children}</DemoContainer>
    </Container>
);

BlogDemoContainer.propTypes = {
    heading: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.bool
    ]),
    subheading: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.bool
    ]),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

BlogDemoContainer.defaultProps = {
    heading: false,
    subheading: false
};

export default BlogDemoContainer;

const Container = styled.section``;

const Heading = styled(BlogSectionHeading)``;

const SubHeading = styled(BlogSectionHeading)`
    margin: 0;
    font-size: 1.2em;
`;

const DemoContainer = styled.div`
    border-radius: 8px;
    border-color: ${({ theme }) => theme.popoutMenuBorderColor};
    border-width: 2px;
    border-style: solid;
    padding: 2em 1em;
    margin: 1em 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    > * {
        margin: 1em;
    }
`;
