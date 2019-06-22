/**
 * Theme variables for the _app.js level styled-components theme
 *
 * Override any of these variables in /src/pages component exports
 * https://www.styled-components.com/docs/advanced#theming
 */
const defaultTheme = {
  // Navigation colors
  headerNavFontColor: 'black',
  headerNavHoverFontColor: 'cyan',
  headerNavTextUnderlineColor: 'cyan',
  headerNavHamburgerIconColor: 'black',
  headerNavMobileMenuFontColor: 'white',
  // UI colors
  popoutMenuBorderColor: 'black',
  // Page colors
  pageBackgroundColor: '#9e9e9e',
  pageContentFontColor: 'black',
  pageContentLinkHoverColor: 'cyan',
  pageContentWidth: 740,
  // Media Query Breakpoints
  breakpoints: {
    mobileNav: 'min-width: 1061px',
    desktopNav: 'max-width: 1060px'
  }
};

export default defaultTheme;

export const generatePageTheme = ({
  fontColor,
  highlightFontColor,
  backgroundColor,
  override
}) => ({
  ...defaultTheme,
  headerNavFontColor: fontColor,
  headerNavTextUnderlineColor: highlightFontColor,
  headerNavHoverFontColor: highlightFontColor,
  headerNavHamburgerIconColor: fontColor,
  pageBackgroundColor: backgroundColor,
  pageContentFontColor: fontColor,
  pageContentLinkHoverColor: highlightFontColor,
  popoutMenuBorderColor: fontColor,
  ...override
});
