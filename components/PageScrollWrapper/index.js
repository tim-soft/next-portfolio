import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';

/**
 * A full page component that allows scrolling and proper positioning under the WebsiteLayout fixed header
 */
const PageScrollWrapper = ({ children, backgroundColor }) => (
  <Container backgroundColor={backgroundColor}>
    <StyledScrollbar
      trackYRenderer={({ elementRef, style, ...restProps }) => (
        <span
          {...restProps}
          style={{
            ...style,
            background: '#9E9E9E',
            width: '9px',
            height: '100%',
            top: 0
          }}
          ref={elementRef}
        />
      )}
    >
      <ScrollbarContentContainer>{children}</ScrollbarContentContainer>
    </StyledScrollbar>
  </Container>
);

PageScrollWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  backgroundColor: PropTypes.string
};

PageScrollWrapper.defaultProps = {
  backgroundColor: null
};

export default PageScrollWrapper;

const ScrollbarContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100%;
  padding: 0 20px;
`;

const StyledScrollbar = styled(Scrollbar)`
  width: 100%;
  height: calc(100% - 90px);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  height: 100vh;
  background: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.pageBackgroundColor};
`;
