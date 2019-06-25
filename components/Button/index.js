import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from 'color';

const Button = ({ children, ...props }) => (
  <StyledButton type="button" {...props}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Button.defaultProps = {
  children: null
};

export default Button;

const StyledButton = styled.button`
  transition: all 0.2s linear;
  transition-property: border-color, background-color, color;

  color: ${({ theme }) => theme.pageContentFontColor};

  background-color: ${({ theme }) => {
    // Calculate a hover color lighter or darker than background
    // based on how bright the background color is
    const color = Color(theme.pageBackgroundColor);
    const luminosity = color.luminosity();

    if (luminosity > 0.3)
      return Color(theme.pageBackgroundColor)
        .darken(0.05)
        .hex();

    return Color(theme.pageBackgroundColor)
      .lighten(0.1)
      .hex();
  }};

  border-color: ${({ theme }) => theme.popoutMenuBorderColor};
  border-width: 2px;
  border-style: solid;
  border-radius: 5px;

  line-height: 2.5em;
  font-size: 17px;

  padding: 0 10px;
  :focus {
    outline: none;
  }
  :hover,
  :active {
    border-color: ${({ theme }) => theme.pageContentLinkHoverColor};
    color: ${({ theme }) => theme.pageContentLinkHoverColor};
    background-color: ${({ theme }) => {
      // Calculate a hover color lighter or darker than background
      // based on how bright the background color is
      const color = Color(theme.pageBackgroundColor);
      const luminosity = color.luminosity();

      if (luminosity < 0.3)
        return Color(theme.pageBackgroundColor)
          .darken(0.05)
          .hex();

      return Color(theme.pageBackgroundColor)
        .lighten(0.1)
        .hex();
    }};
    cursor: pointer;
  }
`;
