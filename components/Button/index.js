import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ children, ...props }) => (
    <StyledButton type="button" {...props}>
        {children}
    </StyledButton>
);

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

Button.defaultProps = {
    children: null,
};

export default Button;

const StyledButton = styled.button`
    transition: all 0.2s linear;
    transition-property: border-color, background-color, color;

    color: ${({ theme }) => theme.pageContentFontColor};

    background-color: ${({ theme }) => theme.accentColor};
    border-color: ${({ theme }) => theme.popoutMenuBorderColor};
    border-width: 2px;
    border-style: solid;
    border-radius: 5px;

    line-height: 2.5em;
    font-size: 17px;

    padding: 0 10px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    :focus {
        outline: none;
    }
    :hover,
    :active {
        border-color: ${({ theme }) => theme.pageContentLinkHoverColor};
        color: ${({ theme }) => theme.pageContentLinkHoverColor};
        background-color: ${({ theme }) => theme.accentHoverColor};
        cursor: pointer;
    }
`;
