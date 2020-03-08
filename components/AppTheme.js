import Color from 'color';

export const calculateAccentColor = bgColor => {
    // Calculate a hover color lighter or darker than background
    // based on how bright the background color is
    const newColor = Color(bgColor);
    const luminosity = newColor.luminosity();

    // The background color is light, so the accent color must be darkened
    if (luminosity > 0.25) return newColor.darken(0.1).hex();

    // The background is dark, so the accent color must be lightened
    return newColor.lighten(0.2).hex();
};

export const calculateAccentHoverColor = bgColor => {
    // Calculate a hover color lighter or darker than background
    // based on how bright the background color is
    const newColor = Color(bgColor);
    const luminosity = newColor.luminosity();

    // The background color is light, so the hover color must be darkened
    if (luminosity < 0.25) return newColor.darken(0.1).hex();

    // The background accent color is dark, so the hover color must be lighter
    // Using the regular default background color is usually fine
    return newColor.hex();
};

/**
 * Generates a full app theme from three colors.
 *
 * @param {String} fontColor
 * @param {String} highlightFontColor
 * @param {String} backgroundColor
 * @param {*} override Any additional properties for overriding the generated theme
 */
export const generatePageTheme = ({
    fontColor,
    highlightFontColor,
    backgroundColor,
    override
}) => ({
    // Navigation colors
    headerNavFontColor: fontColor,
    headerNavTextUnderlineColor: highlightFontColor,
    headerNavHoverFontColor: highlightFontColor,
    headerNavHamburgerIconColor: fontColor,
    headerNavMobileMenuFontColor: 'white',
    // UI colors
    popoutMenuBorderColor: fontColor,
    accentColor: calculateAccentColor(backgroundColor),
    accentHoverColor: calculateAccentHoverColor(backgroundColor),
    // Page colors
    pageBackgroundColor: backgroundColor,
    pageContentFontColor: fontColor,
    pageContentLinkHoverColor: highlightFontColor,
    pageContentWidth: 740,
    pageContentSelectionColor: backgroundColor,
    // Media Query Breakpoints
    breakpoints: {
        mobileNav: 'min-width: 1061px',
        desktopNav: 'max-width: 1060px'
    },
    ...override
});

/**
 * Theme variables for the _app.js level styled-components theme
 *
 * Override any of these variables in /src/pages component exports
 * https://www.styled-components.com/docs/advanced#theming
 */
const defaultTheme = generatePageTheme({
    fontColor: 'black',
    highlightFontColor: 'cyan',
    backgroundColor: '#9e9e9e'
});

export default defaultTheme;

export const darkTheme = generatePageTheme({
    fontColor: '#e2e5ec',
    highlightFontColor: 'aquamarine',
    backgroundColor: '#101010',
    override: {
        accentColor: '#1f1f1f',
        pageContentSelectionColor: 'aquamarine'
    }
});

export const greyTheme = generatePageTheme({
    fontColor: 'black',
    highlightFontColor: 'cyan',
    backgroundColor: '#9e9e9e'
});

export const blueTheme = generatePageTheme({
    fontColor: '#31d7f9',
    highlightFontColor: 'springgreen',
    backgroundColor: '#202629'
});

export const greenTheme = generatePageTheme({
    fontColor: 'black',
    highlightFontColor: 'springgreen',
    backgroundColor: '#019800'
});
