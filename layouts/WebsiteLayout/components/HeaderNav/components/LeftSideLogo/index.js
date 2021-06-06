import * as React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { animated, useTransition } from '@react-spring/web';
import { GoMarkGithub } from 'react-icons/go';
import LocationTagline from 'components/LocationTagline';
import StyledLogo from '../StyledLink';

const closed = { opacity: 0, height: '0px' };
const opened = { opacity: 1, height: '500px' };

// eslint-disable-next-line react/prop-types
const LeftSideLogo = ({ menuIsOpen, toggleMenu, showBio }) => {
    const [isHovering, setIsHovering] = React.useState(false);

    const menuTransition = useTransition(showBio || isHovering, {
        initial: showBio ? closed : opened,
        from: closed,
        enter: opened,
        leave: closed,
    });

    return (
        <LogoProfileContainer
            menuIsOpen={menuIsOpen}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => setIsHovering(true)}
        >
            <LogoProfile>
                <Link passHref href="/">
                    <Logo
                        menuIsOpen={menuIsOpen}
                        onClick={() => menuIsOpen && toggleMenu()}
                        isHovering={isHovering}
                        active={showBio}
                    >
                        <MainHeading>Tim Ellenberger</MainHeading>
                        <SubheadingContainer
                            menuIsOpen={menuIsOpen}
                            isHovering={isHovering}
                        >
                            <SubHeading>React</SubHeading>
                            <SubHeading> | </SubHeading>
                            <SubHeading>GraphQL</SubHeading>
                            <SubHeading> | </SubHeading>
                            <SubHeading>Consulting</SubHeading>
                        </SubheadingContainer>
                    </Logo>
                </Link>
            </LogoProfile>
            {menuTransition(
                (styles, showMenu) =>
                    showMenu && (
                        <AnimatedContainer style={styles}>
                            <AvatarImage
                                src="/static/avatar.png"
                                alt="avatar"
                            />
                            <StyledLink
                                href="https://github.com/tim-soft"
                                target="_blank"
                                rel="noopener"
                            >
                                <GoMarkGithub size="2.5em" />
                                <GitHubUsername>GitHub@tim-soft</GitHubUsername>
                            </StyledLink>
                            <StyledLink href="mailto:timellenberger@gmail.com">
                                <span>Email: Click to view</span>
                            </StyledLink>
                            <BioParagraph>
                                I build super fast web apps with React and
                                GraphQL.
                            </BioParagraph>
                            {/* Emoji found with https://emojipedia.org/ */}
                            <BioParagraph>
                                <LocationTagline />
                            </BioParagraph>
                        </AnimatedContainer>
                    )
            )}
        </LogoProfileContainer>
    );
};

export default LeftSideLogo;

const GitHubUsername = styled.span`
    margin-left: 6px;
`;

const MainHeading = styled.h1`
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
`;

const SubHeading = styled.span`
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
`;

const BioParagraph = styled.div`
    color: white;
    margin: 10px;
    line-height: 21px;
    text-align: center;
    margin-top: auto;
`;

const StyledLink = styled.a`
    color: white;
    text-decoration: none;
    margin: 10px;
    display: flex;
    align-items: center;
    transition: color 0.2s linear;
    :hover {
        color: ${({ theme }) => theme.pageContentLinkHoverColor};
    }
`;

const AvatarImage = styled.img`
    width: 90px;
    border-radius: 50%;
    margin: 100px 0 20px 0;
`;

const LogoProfile = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 5px;
    width: 100%;
    height: inherit;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const SubheadingContainer = styled.h2`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-weight: normal;
    margin: 0;
    padding: 2px 12px 0 12px;
    transition: color 0.2s linear;
    color: ${({ theme, menuIsOpen, isHovering }) => {
        if (menuIsOpen) return theme.headerNavMobileMenuFontColor;
        if (isHovering) return 'white';

        return theme.headerNavHamburgerIconColor;
    }};
`;

const Logo = styled(StyledLogo)`
    height: 60px;
    padding: 0;
    z-index: 21;
    font-size: 2.2em;
    text-decoration: none;
    ::before {
        top: 110%;
    }
    color: ${({ theme, menuIsOpen, isHovering }) => {
        if (menuIsOpen) return theme.headerNavMobileMenuFontColor;
        if (isHovering) return 'white';

        return theme.headerNavHamburgerIconColor;
    }};
    ${({ active, isHovering, menuIsOpen, theme }) => {
        // If the Bio pane is open, highlight and underline link
        if ((active || isHovering) && !menuIsOpen)
            return css`
                color: ${theme.headerNavHoverFontColor};
                ::before {
                    transform-origin: center top;
                    transform: scale(1, 1);
                }
            `;
    }};
    @media (${({ theme }) => theme.breakpoints.desktopNav}) {
        margin: 0;
    }
    @media (max-width: 400px) {
        font-size: 2em;
    }
    @media (max-width: 350px) {
        font-size: 1.9em;
    }
`;

const AnimatedContainer = styled(animated.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    border-radius: 2%;
    border-width: 1px;
    border-color: ${({ theme }) => theme.popoutMenuBorderColor};
    border-style: solid;
    background-color: rgba(26, 26, 26, 0.73);
    /* Viewport Height - body margin - border width */
    max-height: calc(100vh - 15px - 2px);
    @media (max-width: 420px) {
        width: calc(100% - 10px);
        border: none;
        max-height: 100vh;
    }
`;

const LogoProfileContainer = styled.main`
    position: absolute;
    top: 0;
    left: 0;
    z-index: ${({ menuIsOpen }) => (menuIsOpen ? 22 : 'inherit')};
    width: 300px;
    padding: 10px;

    @media (max-width: 420px) {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        ${Logo} {
            align-self: flex-start;
        }
        ${SubheadingContainer} {
            padding: 4px 6px 0 6px;
        }
        ${LogoProfile} {
            width: auto;
            padding: 15px 5px;
        }
        ${AnimatedContainer} {
            width: calc(100% - 10px);
            border-radius: 0;
        }
    }
`;
