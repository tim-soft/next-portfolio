import React from 'react';
import NextSEO, { BlogJsonLd } from 'next-seo';
import {
  BlogParagraph,
  BlogCodeBlock,
  BlogCodeSandboxEmbed,
  BlogArticleContainer
} from 'components/Blog';

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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
        justo eget magna fermentum iaculis. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
        penatibus et magnis dis. Faucibus a pellentesque sit amet porttitor eget
        dolor morbi. Elementum sagittis vitae et leo duis ut. Scelerisque eu
        ultrices vitae auctor.
      </BlogParagraph>
      <BlogCodeBlock
        code={`
import React from 'react';

const SomeComponent = () => <div />;

export default SomeComponent;
      `}
      />
      <BlogParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
        justo eget magna fermentum iaculis. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
        penatibus et magnis dis. Faucibus a pellentesque sit amet porttitor eget
        dolor morbi. Elementum sagittis vitae et leo duis ut. Scelerisque eu
        ultrices vitae auctor.
      </BlogParagraph>
      <BlogCodeSandboxEmbed
        src="https://codesandbox.io/embed/308zj3k7l1?autoresize=1&fontsize=14&view=preview"
        title="3D Snowfall"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
      <BlogParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
        justo eget magna fermentum iaculis. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
        penatibus et magnis dis. Faucibus a pellentesque sit amet porttitor eget
        dolor morbi. Elementum sagittis vitae et leo duis ut. Scelerisque eu
        ultrices vitae auctor.
      </BlogParagraph>
      <BlogParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
        justo eget magna fermentum iaculis. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
        penatibus et magnis dis. Faucibus a pellentesque sit amet porttitor eget
        dolor morbi. Elementum sagittis vitae et leo duis ut. Scelerisque eu
        ultrices vitae auctor.
      </BlogParagraph>
      <BlogParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
        justo eget magna fermentum iaculis. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
        penatibus et magnis dis. Faucibus a pellentesque sit amet porttitor eget
        dolor morbi. Elementum sagittis vitae et leo duis ut. Scelerisque eu
        ultrices vitae auctor.
      </BlogParagraph>
    </BlogArticleContainer>
  </>
);

// const fontColor = '#BAE7DC'; // Chalky White
// const fontColor = '#28A9C5'; // Blue
// const fontColor = '#B5B69D';
// const fontColor = '#aaf0d1'; // Mint Magic

const fontColor = '#202629';
const highlightFontColor = '#EDE4C4';
const backgroundColor = '#119ebb';

// _app.js level theme variable overrides
BlogPage.theme = {
  headerNavFontColor: fontColor,
  headerNavTextUnderlineColor: highlightFontColor,
  headerNavHoverFontColor: highlightFontColor,
  headerNavHamburgerIconColor: fontColor,
  pageBackgroundColor: backgroundColor,
  pageContentFontColor: fontColor,
  pageContentLinkHoverColor: highlightFontColor
};

export default BlogPage;
