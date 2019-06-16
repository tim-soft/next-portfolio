/**
 * Theme variables for the _app.js level styled-components theme
 *
 * Override any of these variables in /src/pages component exports
 * https://www.styled-components.com/docs/advanced#theming
 */
export default {
  // Navigation colors
  headerNavFontColor: 'white',
  headerNavHoverFontColor: '#ff6054',
  headerNavTextUnderlineColor: 'cyan',
  headerNavHamburgerIconColor: 'white',
  headerNavMobileMenuFontColor: 'white',
  // UI colors
  popoutMenuBorderColor: 'black',
  // Page colors
  pageBackgroundColor: '#9e9e9e',
  pageContentFontColor: 'black',
  pageContentLinkHoverColor: 'cyan',
  // Blog vars
  blogArticleWidth: 700,
  // Media Query Breakpoints
  breakpoints: {
    mobileNav: 'min-width: 1061px',
    desktopNav: 'max-width: 1060px'
  }
};
