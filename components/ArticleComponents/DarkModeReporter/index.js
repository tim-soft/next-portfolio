import React from 'react';

class DarkModeReporter extends React.Component {
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
  }

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

export default DarkModeReporter;
