import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import {
    BlogParagraph,
    BlogLink,
    BlogCodeBlock,
    BlogQuote,
    BlogCodeInline
} from 'components/Blog';
import BlogPostLayout from 'layouts/BlogPostLayout';
import { blueTheme } from 'components/AppTheme';

const BlogPage = ({ route, theme }) => (
    <ThemeProvider theme={theme}>
        <BlogPostLayout route={route}>
            <BlogQuote>
                Sometimes you just need to show your JavaScript object in the
                browser and JSON.stringify() isn&apos;t going to cut it!
            </BlogQuote>
            <BlogParagraph>
                I recently published a very config-heavy graphics library for
                React,{' '}
                <BlogLink
                    href="https://github.com/tim-soft/react-particles-webgl"
                    paragraph
                >
                    react-particles-webgl
                </BlogLink>
                , and as I was building the{' '}
                <BlogLink href="/particles" paragraph>
                    demo page (go play with it!)
                </BlogLink>
                I began realizing how convenient it would be to copy + paste the
                current config directly into your own code. I already had the
                entire particle config saved in React state for updating the
                particles as you change it&apos;s parameters. Luckily, all I
                needed was to get that object into the browser somehow.
            </BlogParagraph>
            <BlogParagraph>
                Consulting the{' '}
                <BlogLink
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify"
                    paragraph
                >
                    <code>JSON.stringify()</code>
                </BlogLink>{' '}
                documentation shows that while it&apos;s possible to neatly
                indent an object as JSON, we cannot modify the formatting to
                make our JSON appear as a JavaScript object.
            </BlogParagraph>
            <BlogQuote>
                <span>
                    The reason is while JSON may be a valid JavaScript object,{' '}
                    <BlogLink
                        href="https://stackoverflow.com/a/2904181"
                        paragraph
                    >
                        a valid JavaScript object is not necessarily JSON
                    </BlogLink>
                    . Separately, JSON isn&apos;t likely to be how you write out
                    your React props, so a better solution needed to be found.
                </span>
            </BlogQuote>
            <BlogParagraph>
                After pouring over countless Stack Overflow and Google search
                results, I finally came across a package for solving this exact
                problem:{` `}
                <BlogLink
                    href="https://www.npmjs.com/package/stringify-object"
                    paragraph
                >
                    stringify-object
                </BlogLink>
                .
            </BlogParagraph>
            <BlogParagraph>
                Usage is just as simple as{' '}
                <BlogCodeInline>JSON.stringify()</BlogCodeInline>.
            </BlogParagraph>
            <BlogCodeBlock
                language="js"
                path="/data/config.js"
                code={`
import stringifyObject from 'stringify-object';

const config = {
  showCube: true,
  dimension: '3D',
  velocity: 2,
  boundaryType: 'bounce',
  antialias: true,
  particles: {
    colorMode: 'rainbow',
    color: '#3FB568',
    transparency: 0.9,
    shape: 'square',
    boundingBox: 'canvas',
    count: 500,
    minSize: 10,
    maxSize: 75,
    visible: true
  }
}

const configString = stringifyObject(config, {
  indent: '  ',
  singleQuotes: true
});
        `}
            />
            <BlogParagraph>
                After generating this string via{' '}
                <BlogCodeInline>stringifyObject()</BlogCodeInline>, one could
                simply run it through a syntax highlighter like I&apos;ve
                detailed in my post{' '}
                <BlogLink
                    href="/blog/building-react-code-blocks-with-prism"
                    paragraph
                >
                    building-react-code-blocks-with-prism
                </BlogLink>{' '}
                to represent any object in the browser as it would appear in
                your code editor.
            </BlogParagraph>
        </BlogPostLayout>
    </ThemeProvider>
);

BlogPage.propTypes = {
    route: PropTypes.string.isRequired,
    theme: PropTypes.object
};

BlogPage.defaultProps = {
    theme: {}
};

// Override default app theme for this page
BlogPage.pageTheme = blueTheme;

export default BlogPage;
