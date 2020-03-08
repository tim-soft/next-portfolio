import styled from 'styled-components';

export default styled.a`
    position: relative;
    font-family: 'Montserrat', sans-serif;
    white-space: nowrap;
    color: ${({ theme }) => theme.headerNavFontColor};
    font-size: 2em;
    margin: 0 20px;
    padding: 15px 0;
    transition: color 0.2s linear;
    :hover {
        cursor: pointer;
        color: ${({ theme }) => theme.headerNavHoverFontColor};
    }
    ::before {
        content: '';
        display: block;
        position: absolute;
        top: 105%;
        height: 3px;
        width: 100%;
        background-color: ${({ theme }) => theme.headerNavTextUnderlineColor};
        transform-origin: center top;
        transform: scale(0, 1);
        transition: color 0.1s, transform 0.2s ease-out;
    }
    :active::before {
        background-color: ${({ theme }) => theme.headerNavHoverFontColor};
    }
    :focus::before,
    :hover::before {
        transform-origin: center top;
        transform: scale(1, 1);
    }
`;
