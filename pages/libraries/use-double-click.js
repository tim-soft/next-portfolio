import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import LibraryLayout from 'layouts/LibraryLayout';
import { darkTheme } from 'components/AppTheme';
import { BlogCodeBlock, BlogCodeInline } from 'components/Blog';
import UseDoubleClickDemo from 'components/Libraries/use-double-click/demo';

const LibraryPage = ({ route, theme }) => (
    <ThemeProvider theme={theme}>
        <LibraryLayout route={route}>
            <section>
                <p>
                    <BlogCodeInline>use-double-click</BlogCodeInline> is a
                    simple React hook for differentiating single and double
                    clicks on the same component.
                </p>
            </section>
            <section>
                <h2>Demo</h2>
                <UseDoubleClickDemo />
            </section>
            <section>
                <h2>
                    What&apos;s wrong with native{` `}
                    <BlogCodeInline>onDoubleClick()</BlogCodeInline>?
                </h2>
                <p>
                    When you double click on a React component, it&apos;s{' '}
                    <BlogCodeInline>onClick()</BlogCodeInline> callback fires
                    twice alongside your single{' '}
                    <BlogCodeInline>onDoubleClick()</BlogCodeInline> callback.
                    This effect isn&apos;t desirable when a single click and a
                    double click have different functions!
                </p>
                <p>
                    <BlogCodeInline>useDoubleClick()</BlogCodeInline> waits
                    within a latency window after a click for a secondary click,
                    and only after this period either the{' '}
                    <BlogCodeInline>onSingleClick()</BlogCodeInline> or{' '}
                    <BlogCodeInline>onDoubleClick()</BlogCodeInline>
                    callback will fire a single time.
                </p>
            </section>
            <section>
                <h2>Installation</h2>
                <p>
                    This library is built with hooks and requires React {`>=`}{' '}
                    16.8.0
                </p>
                <BlogCodeBlock
                    path="Terminal"
                    language="bash"
                    code="yarn add use-double-click"
                />
            </section>
            <section>
                <h2>Basic Usage</h2>
                <BlogCodeBlock
                    path="/components/Clicker.js"
                    language="jsx"
                    code={`
import { useRef } from 'react';
import useDoubleClick from 'use-double-click';

const Button = () => {
  const buttonRef = useRef();
  
  useDoubleClick({
    /** A callback function for single click events */
    onSingleClick: e => console.log(e, 'single click'),
    /** A callback function for double click events */
    onDoubleClick: e => console.log(e, 'double click'),
    /** (Required) Dom node to watch for double clicks */
    ref: buttonRef,
    /**
     * The amount of time (in milliseconds) to wait 
     * before differentiating a single from a double click
     */
    latency: 250
  });
  
  return <button ref={buttonRef}>Click Me</button>
}
      `}
                />
            </section>
        </LibraryLayout>
    </ThemeProvider>
);

LibraryPage.propTypes = {
    route: PropTypes.string.isRequired,
    theme: PropTypes.object
};

LibraryPage.defaultProps = {
    theme: {}
};

LibraryPage.pageTheme = darkTheme;

export default LibraryPage;
