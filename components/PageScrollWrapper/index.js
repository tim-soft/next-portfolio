import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Scrollbar from 'components/Scrollbar';

/**
 * A full page component that allows scrolling and proper positioning under the WebsiteLayout fixed header
 */
const PageScrollWrapper = ({ children, backgroundColor }) => (
    <Container backgroundColor={backgroundColor}>
        <Scrollbar
            contentProps={{
                // eslint-disable-next-line react/prop-types
                renderer: ({ elementRef, ...restProps }) => (
                    <ScrollbarContentContainer
                        {...restProps}
                        ref={elementRef}
                    />
                ),
            }}
        >
            {children}
        </Scrollbar>
    </Container>
);

PageScrollWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    backgroundColor: PropTypes.string,
};

PageScrollWrapper.defaultProps = {
    backgroundColor: null,
};

export default PageScrollWrapper;

const ScrollbarContentContainer = styled.div`
    &[style] {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        padding: 0 15px !important;
    }
`;

const Container = styled.div`
    padding-top: 90px;
    height: calc(100% - 90px);
    background: ${({ theme, backgroundColor }) =>
        backgroundColor || theme.pageBackgroundColor};
`;
