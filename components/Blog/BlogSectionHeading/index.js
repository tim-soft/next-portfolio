import styled from 'styled-components';

export default styled.h2`
    transition: color 0.2s linear;
    color: ${({ theme }) => theme.pageContentFontColor};
    font-weight: normal;
    margin: 1.5em 0;
    text-align: center;
    font-size: 2em;
`;
