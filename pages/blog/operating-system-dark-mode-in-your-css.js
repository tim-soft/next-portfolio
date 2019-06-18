import React from 'react';
import NextSEO, { BlogJsonLd } from 'next-seo';
import dynamic from 'next/dynamic';
import { BlogParagraph, BlogLink, BlogArticleContainer } from 'components/Blog';

const BlogCodeBlock = dynamic(() => import('components/Blog/BlogCodeBlock'));

const BlogPage = () => (
  <>
    <NextSEO
      config={{
        title: 'Coding, Musings and Adventures of Tim Ellenberger',
        openGraph: {
          title: 'Coding, Musings and Adventures of Tim Ellenberger'
        }
      }}
    />
    <BlogJsonLd
      url="https://timellenberger.now.sh/blog"
      title="Coding, Musings and Adventures of Tim Ellenberger"
      images={['https://timellenberger.now.sh/static/avatar.png']}
      datePublished="2019-03-31T08:00:00+08:00"
      dateModified="2019-03-31T09:00:00+08:00"
      authorName="Tim Ellenberger"
      description="Coding, Musings and Adventures of Tim Ellenberger"
    />
    <BlogArticleContainer>
      <BlogParagraph>
        Already have a dark mode in your web app? Why not set a sensible default
        for your users by mirroring their system&apos;s dark mode preferences?
      </BlogParagraph>

      <BlogParagraph>
        You can access this preference via the new media query{' '}
        <BlogLink
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme"
          paragraph
          noWrap
        >
          @media(prefers-color-scheme: dark)
        </BlogLink>
      </BlogParagraph>

      <BlogCodeBlock
        language="css"
        path="styles/theme.css"
        code={`
/* The browser supports prefers-color-scheme,
but cannot find a light/dark preference */
@media (prefers-color-scheme: no-preference) {
  background: black;
  color: white;
}

/* Use dark mode */
@media (prefers-color-scheme: dark) {
  background: black;
  color: white;
}

/* Use light mode */
@media (prefers-color-scheme: light) {
  background: white;
  color: black;
}
      `}
      />
      <BlogParagraph>
        Use the{' '}
        <BlogLink
          href="https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia"
          paragraph
          noWrap
        >
          Window.matchMedia()
        </BlogLink>{' '}
        function to retrieve this setting programatically in Javascript
      </BlogParagraph>
      <BlogCodeBlock
        language="js"
        path="console"
        code={`
// true if the browser supports prefers-color-scheme
window.matchMedia("(prefers-color-scheme)").matches

// true if there is a system level dark mode preference
window.matchMedia("(prefers-color-scheme: dark)").matches
      `}
      />
    </BlogArticleContainer>
  </>
);

const fontColor = '#e2e5ec';
const highlightFontColor = 'aquamarine';
const backgroundColor = '#101010';

// _app.js level theme variable overrides
BlogPage.theme = {
  headerNavFontColor: fontColor,
  headerNavTextUnderlineColor: highlightFontColor,
  headerNavHoverFontColor: highlightFontColor,
  headerNavHamburgerIconColor: fontColor,
  pageBackgroundColor: backgroundColor,
  pageContentFontColor: fontColor,
  pageContentLinkHoverColor: highlightFontColor,
  popoutMenuBorderColor: fontColor,
  blogArticleWidth: 740
};

export default BlogPage;
