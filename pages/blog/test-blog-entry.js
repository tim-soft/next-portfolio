import React from 'react';
import NextSEO, { BlogJsonLd } from 'next-seo';
import PageScrollWrapper from 'components/PageScrollWrapper';
import {
  BlogArticleBanner,
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
    <PageScrollWrapper>
      <BlogArticleContainer>
        <BlogArticleBanner
          title="This is a test blog page"
          publishDate="Aug 12, 2019"
        />
        <BlogParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem
          integer vitae justo eget magna fermentum iaculis. Tristique senectus
          et netus et malesuada fames ac turpis egestas. Elit eget gravida cum
          sociis natoque penatibus et magnis dis. Faucibus a pellentesque sit
          amet porttitor eget dolor morbi. Elementum sagittis vitae et leo duis
          ut. Scelerisque eu ultrices vitae auctor.
        </BlogParagraph>
        <BlogCodeBlock
          code={`
import React from 'react';

const SomeComponent = () => <div />;

export default SomeComponent;
      `}
        />
        <BlogParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem
          integer vitae justo eget magna fermentum iaculis. Tristique senectus
          et netus et malesuada fames ac turpis egestas. Elit eget gravida cum
          sociis natoque penatibus et magnis dis. Faucibus a pellentesque sit
          amet porttitor eget dolor morbi. Elementum sagittis vitae et leo duis
          ut. Scelerisque eu ultrices vitae auctor.
        </BlogParagraph>
        <BlogCodeSandboxEmbed
          src="https://codesandbox.io/embed/308zj3k7l1?autoresize=1&fontsize=14&view=preview"
          title="3D Snowfall"
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        />
        <BlogParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem
          integer vitae justo eget magna fermentum iaculis. Tristique senectus
          et netus et malesuada fames ac turpis egestas. Elit eget gravida cum
          sociis natoque penatibus et magnis dis. Faucibus a pellentesque sit
          amet porttitor eget dolor morbi. Elementum sagittis vitae et leo duis
          ut. Scelerisque eu ultrices vitae auctor.
        </BlogParagraph>
        <BlogParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem
          integer vitae justo eget magna fermentum iaculis. Tristique senectus
          et netus et malesuada fames ac turpis egestas. Elit eget gravida cum
          sociis natoque penatibus et magnis dis. Faucibus a pellentesque sit
          amet porttitor eget dolor morbi. Elementum sagittis vitae et leo duis
          ut. Scelerisque eu ultrices vitae auctor.
        </BlogParagraph>
        <BlogParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem
          integer vitae justo eget magna fermentum iaculis. Tristique senectus
          et netus et malesuada fames ac turpis egestas. Elit eget gravida cum
          sociis natoque penatibus et magnis dis. Faucibus a pellentesque sit
          amet porttitor eget dolor morbi. Elementum sagittis vitae et leo duis
          ut. Scelerisque eu ultrices vitae auctor.
        </BlogParagraph>
      </BlogArticleContainer>
    </PageScrollWrapper>
  </>
);

// _app.js level theme variable overrides
BlogPage.theme = {
  headerNavFontColor: 'black',
  headerNavHoverFontColor: '#00e5e5',
  headerNavHamburgerIconColor: 'black',
  pageBackgroundColor: 'green'
};

export default BlogPage;
