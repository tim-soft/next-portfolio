import React from 'react';
import { FiHeart, FiPrinter, FiShare } from 'react-icons/fi';
import styled from 'styled-components';
import Color from 'color';

const ImageOverlay = () => (
    <OverlayContainer>
        <p>Create your own UI</p>
        <FiPrinter size="3em" />
        <FiShare size="3em" />
        <FiHeart size="3em" />
    </OverlayContainer>
);

export default ImageOverlay;

const OverlayContainer = styled.div`
    position: absolute;
    top: 0%;
    right: 0%;
    border: ${({ theme }) => theme.pageContentSelectionColor} 1px solid;
    background: rgba(39, 39, 39, 0.5);
    p {
        color: ${({ theme }) => theme.pageContentSelectionColor};
        text-align: center;
        font-weight: bold;
        font-size: 1.2em;
        margin: 0.5em 0;
    }
    svg {
        border: white 1px solid;
        fill: ${({ theme }) => theme.pageContentSelectionColor};
        margin: 10px;
        padding: 5px;
        :hover {
            border: ${({ theme }) => theme.pageContentSelectionColor} 1px solid;
            fill: ${({ theme }) =>
                new Color(theme.pageContentSelectionColor).darken(0.57).hex()};
            cursor: pointer;
        }
    }
`;
