import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { darkTheme, greyTheme } from 'components/AppTheme';
import Color from 'color';

/**
 * Displays the current dark/light mode system preference,
 * sets dynamic app theme to match.
 */
class DarkModeReporter extends React.Component {
    static propTypes = {
        updateTheme: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            supportsColorScheme: false,
            isDarkMode: false,
            isLightMode: false
        };
    }

    componentDidMount() {
        // Set the initial page theme based on the system theme
        this.updateColorMode();

        // If the system changes it's light/dark mode, then update
        // the current page theme
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addListener(this.updateColorMode);
    }

    componentWillUnmount() {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .removeListener(this.updateColorMode);
    }

    updateColorMode = () => {
        // true if the browser supports prefers-color-scheme
        const supportsColorScheme = window.matchMedia('(prefers-color-scheme)')
            .matches;

        // true if there is a system level dark mode preference
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
            .matches;

        // true if there is a system level dark mode preference
        const isLightMode = window.matchMedia('(prefers-color-scheme: light)')
            .matches;

        this.setState({ supportsColorScheme, isDarkMode, isLightMode });

        // Is the current page in dark mode? i.e. default page theme
        const { theme } = this.props;
        const isCurrentThemeDarkMode = new Color(
            theme.pageBackgroundColor
        ).isDark();

        // Update the current page theme to reflect the operating system
        if (isDarkMode && !isCurrentThemeDarkMode) this.setDarkTheme();
        if (isLightMode && isCurrentThemeDarkMode) this.setLightTheme();
    };

    /**
     * Updates the current page theme to dark mode
     */
    setDarkTheme = () => {
        const { updateTheme } = this.props;
        updateTheme(darkTheme);
    };

    /**
     * Updates the current page theme to light mode
     */
    setLightTheme = () => {
        const { updateTheme } = this.props;
        updateTheme(greyTheme);
    };

    render() {
        const { supportsColorScheme, isDarkMode, isLightMode } = this.state;

        const SystemMode = () => {
            if (!supportsColorScheme)
                return <>Your browser doesn&apos;t support dark mode!</>;
            if (supportsColorScheme && !isDarkMode && !isLightMode)
                return <>Your system light/dark mode preference is unset!</>;
            if (isDarkMode) return <>Your system is in dark mode!</>;

            return <>Your system is in light mode!</>;
        };

        const SettingMode = () => (
            <>
                The page theme has been set to {isLightMode ? 'light' : 'dark'}{' '}
                mode.
            </>
        );

        return (
            <>
                <SystemMode />
                <br />
                <SettingMode />
            </>
        );
    }
}

export default withTheme(DarkModeReporter);
