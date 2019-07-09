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

  state = {
    supportsColorScheme: false,
    isDarkMode: false,
    isLightMode: false
  };

  componentDidMount() {
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
  }

  setDarkTheme = () => {
    const { updateTheme } = this.props;
    updateTheme(darkTheme);
  };

  setLightTheme = () => {
    const { updateTheme } = this.props;
    updateTheme(greyTheme);
  };

  render() {
    const { supportsColorScheme, isDarkMode, isLightMode } = this.state;

    if (supportsColorScheme) {
      if (isDarkMode) return <>Your system is in dark mode!</>;
      if (isLightMode) return <>Your system is in light mode!</>;

      // The browser supports light/dark mode but can't infer anything from the OS
      return <>Your system light/dark mode preference is unset!</>;
    }

    // The browser doesn't support light/dark mode
    return <>Your browser doesn&apos;t support dark mode!</>;
  }
}

export default withTheme(DarkModeReporter);
