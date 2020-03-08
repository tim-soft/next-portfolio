import React from 'react';
import styled from 'styled-components';
import { GoMarkGithub } from 'react-icons/go';
import HiringCallout from 'components/HiringCallout';

const RepoTag = () => (
    <Container>
        <StyledLink
            href="https://github.com/tim-soft/react-particles-webgl#readme"
            target="_blank"
            rel="noopener"
        >
            <RepoTitleContainer>
                <Text>react-particles-webgl</Text>
                <GoMarkGithub size="2em" />
            </RepoTitleContainer>

            <ShieldContainer>
                <NpmShield
                    alt="npm"
                    src="https://img.shields.io/npm/v/react-particles-webgl.svg?color=brightgreen&style=popout-square"
                />
                <NpmShield
                    alt="NPM"
                    src="https://img.shields.io/npm/l/react-particles-webgl.svg?color=brightgreen&style=popout-square"
                />
            </ShieldContainer>
        </StyledLink>
        <StyledHiringCallout />
    </Container>
);

export default RepoTag;

const StyledHiringCallout = styled(HiringCallout)`
    margin: 1em;
    font-size: 1em;
`;

const Container = styled.div`
    position: absolute;
    bottom: 20px;
    width: auto;
    background: #1a1a1ad4;
    color: #eeeeee;
    border: 1px solid #1a1a1ad4;
    transition: all 0.3s linear;
    transition-property: color, border-color;
    :hover {
        color: ${({ theme }) => theme.pageContentLinkHoverColor};
        border-width: 1px;
        border-style: solid;
        border-color: ${({ theme }) => theme.pageContentLinkHoverColor};
    }

    @media (max-width: 512px) {
        display: none;
    }
`;

const StyledLink = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: 10px 10px 0 10px;
    color: inherit;
`;

const Text = styled.h3`
    margin: 0;
    font-weight: normal;
`;

const RepoTitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    svg {
        margin-left: 6px;
    }
`;

const ShieldContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const NpmShield = styled.img`
    margin: 5px 5px 0 5px;
`;
