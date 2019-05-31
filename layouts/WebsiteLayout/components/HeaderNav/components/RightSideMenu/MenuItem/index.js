import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Transition, animated } from 'react-spring/renderprops.cjs';
import Scrollbar from 'react-scrollbars-custom';
import Color from 'color';
import { FiChevronDown } from 'react-icons/fi';
import StyledLink from '../../StyledLink';

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
      PropTypes.element
    ])
  };

  static defaultProps = {
    alwaysShowMenu: false,
    menuWidth: 300,
    menuHeight: 500,
    useScroll: false,
    children: null
  };

  constructor() {
    super();
    this.menuOverlay = React.createRef();
    this.state = {
      isHovering: false,
      rightOffset: null
    };
  }

  componentDidMount() {
    this.calculateRightOffestForMenu();
  }

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
        rightOffset: menuRightSpace * -2
      });
    }
  };

  handleHover = isHovering => {
    this.setState({ isHovering });
  };

  render() {
    const { isHovering, rightOffset } = this.state;
    const {
      link,
      text,
      menuWidth,
      menuHeight,
      children,
      useScroll,
      alwaysShowMenu
    } = this.props;

    return (
      <MenuItemRelativeContainer
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
        onFocus={() => this.handleHover(true)}
      >
        {/* The menu item */}
        <Link prefetch href={link}>
          <MenuLink
            isHovering={isHovering || alwaysShowMenu}
            ref={this.menuOverlay}
            showUnderline={children === null}
          >
            <LinkHeading isHovering={isHovering}>
              {text} {children && <FiChevronDown />}
            </LinkHeading>
          </MenuLink>
        </Link>

        {/* The pop-out menu content */}
        {children && (
          <Transition
            native
            items={isHovering || alwaysShowMenu}
            initial={{ opacity: 0, height: '0px' }}
            from={{ opacity: 0, height: '0px' }}
            enter={{ opacity: 1, height: `${menuHeight}px` }}
            leave={{ opacity: 0, height: '0px' }}
          >
            {isOpen =>
              isOpen &&
              (animatedStyles => (
                <AnimatedContainer
                  style={animatedStyles}
                  rightOffset={rightOffset}
                  width={menuWidth}
                >
                  {useScroll ? (
                    <StyledScrollbar
                      trackYProps={{
                        renderer: props => {
                          // eslint-disable-next-line react/prop-types
                          const { elementRef, style, ...restProps } = props;

                          return (
                            <span
                              {...restProps}
                              style={{
                                ...style,
                                background: '#9E9E9E',
                                width: '11px',
                                height: '100%',
                                top: 0
                              }}
                              ref={elementRef}
                            />
                          );
                        }
                      }}
                    >
                      {children}
                    </StyledScrollbar>
                  ) : (
                    children
                  )}
                </AnimatedContainer>
              ))
            }
          </Transition>
        )}
      </MenuItemRelativeContainer>
    );
  }
}

export default MenuItem;

const StyledScrollbar = styled(Scrollbar)`
  width: 100%;
  height: 100%;
`;

const MenuLink = styled(StyledLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: auto;
  z-index: ${({ isHovering }) => (isHovering ? 12 : 10)};
  color: ${({ theme, isHovering }) =>
    isHovering ? theme.headerNavHoverFontColor : theme.headerNavFontColor};
  > h1 {
    z-index: ${({ isHovering }) => (isHovering ? 12 : 10)};
  }
  ::before {
    display: ${({ showUnderline }) => (showUnderline ? 'block' : 'none')};
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

const LinkHeading = styled.h1`
  margin: 0 15px;
  font-size: inherit;
  font-weight: inherit;
  display: flex;
  align-items: center;
  svg {
    font-size: 22px;
    margin-left: 7px;
    transition: transform 0.4s;
    transform: rotate(${({ isHovering }) => (isHovering ? 180 : 0)}deg);
  }
`;

const AnimatedContainer = animated(styled.div`
  position: absolute;
  top: 66px;
  width: ${({ width }) => `${width}px`};
  right: ${({ rightOffset }) =>
    rightOffset ? `${rightOffset / 2}px` : 'unset'};
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  border-radius: 2%;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  transition: background-color 0.3s linear;
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
  max-height: calc(100vh - 15px);
  font-size: 15px;
  z-index: 11;
  @media (max-width: 420px) {
    width: calc(100% - 10px);
    border-radius: 0;
    max-height: 100vh;
  }
`);
