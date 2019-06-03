import React from 'react';
import Scrollbar from 'react-scrollbars-custom';
import styled from 'styled-components';

/**
 * Wrapper around react-scrollbars-custom with styled scrollbars
 *
 * API and Docs: https://github.com/xobotyi/react-scrollbars-custom
 */
export default ({ ...props }) => (
  <Scrollbar
    {...props}
    trackXProps={{
      // eslint-disable-next-line react/prop-types
      renderer: ({ elementRef, ...restProps }) => (
        <ScrollTrackX {...restProps} trackX ref={elementRef} />
      )
    }}
    trackYProps={{
      // eslint-disable-next-line react/prop-types
      renderer: ({ elementRef, ...restProps }) => (
        <ScrollTrackY {...restProps} trackY ref={elementRef} />
      )
    }}
  />
);

const ScrollTrackY = styled.span`
  background: #9e9e9e !important;
  width: 11px !important;
  height: 100% !important;
  top: 0 !important;
`;

const ScrollTrackX = styled.span`
  background: #9e9e9e !important;
  height: 11px !important;
  width: 100% !important;
  left: 0 !important;
`;
