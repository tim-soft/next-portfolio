import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Switch from 'react-switch';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';

const ToggleSwitch = ({ theme, ...props }) => (
    <StyledSwitch
        uncheckedIcon={<IoMdMoon />}
        checkedIcon={<IoMdSunny />}
        {...props}
    />
);

ToggleSwitch.propTypes = {
    theme: PropTypes.object.isRequired
};

export default withTheme(ToggleSwitch);

const StyledSwitch = styled(Switch)`
    transition: all 0.2s linear !important;
    transition-property: background, border-color, color !important;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.pageContentLinkHoverColor};
    .react-switch-bg {
        background: ${({ theme }) => theme.accentColor} !important;
        > div {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .react-switch-handle {
        background: ${({ theme }) => theme.pageContentFontColor} !important;
    }
    svg {
        fill: ${({ theme }) => theme.pageContentFontColor};
    }
    :hover {
        color: ${({ theme }) => theme.pageContentLinkHoverColor};
        .react-switch-handle {
            background: ${({ theme }) =>
                theme.pageContentLinkHoverColor} !important;
        }
    }
`;
