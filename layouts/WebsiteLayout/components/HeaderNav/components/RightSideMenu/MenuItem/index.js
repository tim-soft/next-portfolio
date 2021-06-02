import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Spring, animated } from '@react-spring/web';
import { FiChevronDown } from 'react-icons/fi';
import Scrollbar from 'components/Scrollbar';

class MenuItem extends React.Component {
    static propTypes = {
        /* URL to redirect when clicking menu item */
        link: PropTypes.string.isRequired,
        /* Text of menu item */
        text: PropTypes.string.isRequired,
        /* Width of popout menu */
        menuWidth: PropTypes.number,
        /* Height of popout menu */
        menuHeight: PropTypes.number,
        /* If true, wrap popout menu content in a scrollable container */
        useScroll: PropTypes.bool,
        /* If true, popout menu is visible at all times */
        alwaysShowMenu: PropTypes.bool,
        /** (Optional) Child elements will be used as content of popout menu.
         * If no children are provided, popout menu won't be rendered.
         */
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
        ]),
    };

    static defaultProps = {
        alwaysShowMenu: false,
        menuWidth: 300,
        menuHeight: 500,
        useScroll: false,
        children: null,
    };

    constructor() {
        super();
        this.menuOverlay = React.createRef();
        this.state = {
            isHovering: false,
            rightOffset: null,
            pageIsVisible: true,
        };
    }

    componentDidMount() {
        // Measure the initial screen width to calculate menu offsets
        this.calculateRightOffestForMenu();

        // If the screen size changes, recalculate menu offsets
        window.addEventListener('resize', this.calculateRightOffestForMenu);
        document.addEventListener(
            'visibilitychange',
            this.handlePageVisibility
        );
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateRightOffestForMenu);
        document.removeEventListener(
            'visibilitychange',
            this.handlePageVisibility
        );
    }

    handlePageVisibility = () => {
        if (document.visibilityState === 'visible')
            this.setState({ pageIsVisible: true });
        else this.setState({ pageIsVisible: false, isHovering: false });
    };

    calculateRightOffestForMenu = () => {
        const { menuWidth } = this.props;
        const { x, width } = this.menuOverlay.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        // Space between item and right window boundary
        const menuRightSpace = windowWidth - (x + width);
        // Space between center of item and window boundary
        const rightWidthBudgetForMenu = windowWidth - (x + width / 2);

        // If there isn't enough space for centered dropdown menu
        // without overflowing out of window, use right offset
        if (rightWidthBudgetForMenu < menuWidth / 2) {
            this.setState({
                rightOffset: menuRightSpace * -2,
            });
        }
    };

    handleHover = (isHovering) => {
        this.setState({ isHovering });
    };

    render() {
        const { isHovering, rightOffset, pageIsVisible } = this.state;
        const {
            link,
            text,
            menuWidth,
            menuHeight,
            children,
            useScroll,
            alwaysShowMenu,
        } = this.props;

        return (
            <MenuItemRelativeContainer
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
                onFocus={() => this.handleHover(true)}
            >
                {/* The menu item */}
                <MenuLink
                    isHovering={isHovering || alwaysShowMenu}
                    ref={this.menuOverlay}
                    showUnderline={children === null}
                >
                    <Link passHref href={link}>
                        <LinkHeading isHovering={isHovering}>
                            {text} {children && <FiChevronDown />}
                        </LinkHeading>
                    </Link>
                </MenuLink>

                {/* The pop-out menu content */}
                {children && pageIsVisible && (
                    <Spring
                        from={{ opacity: 0, height: '0px' }}
                        to={{ opacity: 1, height: `${menuHeight}px` }}
                        reverse={!(isHovering || alwaysShowMenu)}
                    >
                        {(animatedStyles) => (
                            <AnimatedContainer
                                style={animatedStyles}
                                rightOffset={rightOffset}
                                width={menuWidth}
                            >
                                {useScroll ? (
                                    <Scrollbar>{children}</Scrollbar>
                                ) : (
                                    children
                                )}
                            </AnimatedContainer>
                        )}
                    </Spring>
                )}
            </MenuItemRelativeContainer>
        );
    }
}

export default MenuItem;

const MenuLink = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 15px 0;
    z-index: ${({ isHovering }) => (isHovering ? 12 : 10)};
    color: ${({ theme, isHovering }) =>
        isHovering ? theme.headerNavHoverFontColor : theme.headerNavFontColor};
    > a {
        z-index: ${({ isHovering }) => (isHovering ? 12 : 10)};
    }
    position: relative;
    font-family: 'Montserrat', sans-serif;
    white-space: nowrap;
    font-size: 2em;
    transition: color 0.2s linear;
    :hover {
        cursor: pointer;
        color: ${({ theme }) => theme.headerNavHoverFontColor};
    }
    ::before {
        content: '';
        display: ${({ showUnderline }) => (showUnderline ? 'block' : 'none')};
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

const MenuItemRelativeContainer = styled.div`
    position: relative;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LinkHeading = styled.a`
    margin: 0 15px;
    font-size: inherit;
    font-weight: inherit;
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: inherit;
    svg {
        font-size: 22px;
        margin-left: 7px;
        transition: transform 0.4s;
        transform: rotate(${({ isHovering }) => (isHovering ? 180 : 0)}deg);
    }
`;

const AnimatedContainer = animated(styled.div`
    will-change: opacity, height;
    position: absolute;
    top: 64px;
    width: ${({ width }) => `${width}px`};
    right: ${({ rightOffset }) =>
        rightOffset ? `${rightOffset / 2}px` : 'unset'};
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    border-radius: 2%;
    border-color: ${({ theme }) => theme.popoutMenuBorderColor};
    border-width: 1px;
    border-style: solid;
    background-color: ${({ theme }) => theme.accentColor};
    max-height: calc(100vh - 90px);
    font-size: 15px;
    z-index: 11;
    @media (max-width: 420px) {
        width: calc(100% - 10px);
        border-radius: 0;
        max-height: 100vh;
    }
`);
