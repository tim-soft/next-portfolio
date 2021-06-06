import React from 'react';

class WindowSizeReporter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowWidth: null,
        };
    }

    componentDidMount() {
        // Measure the initial screen width to calculate menu offsets
        this.updateWindowSize();

        // If the screen size changes, recalculate menu offsets
        window.addEventListener('resize', this.updateWindowSize);
    }

    componentWillUnmount() {
        // window.removeEventListener('resize', this.updateWindowSize);
    }

    updateWindowSize = () =>
        this.setState({
            windowWidth: window.innerWidth,
        });

    render() {
        const { windowWidth } = this.state;

        return (
            <span>
                Your window width is <strong>{windowWidth}px</strong>
            </span>
        );
    }
}

export default WindowSizeReporter;
