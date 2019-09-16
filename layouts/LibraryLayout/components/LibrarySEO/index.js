import PropTypes from 'prop-types';
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';
import Head from 'next/head';

const APP_URL = process.env.APP_BASE_URL;

/**
 * Inserts software library optimized structured data into the page
 *
 * @see https://developers.google.com/search/docs/guides/intro-structured-data
 * @see https://search.google.com/structured-data/testing-tool
 */
const LibrarySEO = ({ library, route }) => (
  <>
    <Head>
      {/** @see https://schema.org/TechArticle */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              '@context': 'https://schema.org',
              '@type': 'TechArticle',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${APP_URL}${route}`
              },
              headline: library.tagline,
              image: [`${APP_URL}/static/avatar.png`],
              datePublished: library.docsPublishedDate,
              dateModified: library.docsPublishedDate,
              proficiencyLevel: 'Beginner',
              author: {
                '@type': 'Person',
                name: 'Tim Ellenberger'
              },
              creator: {
                '@type': 'Person',
                name: 'Tim Ellenberger',
                url: APP_URL
              },
              publisher: {
                '@type': 'Organization',
                name: 'Tim Ellenberger',
                url: APP_URL,
                logo: {
                  '@type': 'ImageObject',
                  url: `${APP_URL}/static/avatar.png`,
                  width: '140',
                  height: '140'
                }
              },
              description: library.description
            },
            null,
            2
          )
        }}
      />
    </Head>
    {/** @see https://schema.org/breadcrumb */}
    <BreadcrumbJsonLd
      itemListElements={[
        {
          position: 1,
          name: APP_URL,
          item: `${APP_URL}/`
        },
        {
          position: 2,
          name: 'Libraries',
          item: `${APP_URL}/libraries`
        },
        {
          position: 3,
          name: library.name,
          item: `${APP_URL}${route}`
        }
      ]}
    />
    <NextSeo
      title={`${library.name} - Docs`}
      description={library.description}
      canonical={`${APP_URL}${route}`}
      openGraph={{
        url: `${APP_URL}${route}`,
        title: `${library.name} - Docs`,
        description: library.description,
        images: [
          {
            url: `${APP_URL}/static/avatar.png`,
            alt: 'Blog Post Logo'
          }
        ],
        type: 'article',
        article: {
          publishedTime: library.docsPublishedDate,
          section: 'Technology',
          authors: [APP_URL]
        },
        site_name: 'Coding, Musings and Adventures of Tim Ellenberger',
        locale: 'en_US',
        profile: {
          firstName: 'Tim',
          lastName: 'Ellenberger',
          username: 'tim-soft',
          gender: 'male'
        }
      }}
    />
  </>
);

LibrarySEO.propTypes = {
  library: PropTypes.shape({
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    docsPublishedDate: PropTypes.string.isRequired,
    repoUrl: PropTypes.string.isRequired,
    demoLinks: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired
      })
    ).isRequired,
    badges: PropTypes.arrayOf(
      PropTypes.shape({
        badgeUrl: PropTypes.string.isRequired,
        linkUrl: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  route: PropTypes.string.isRequired
};

export default LibrarySEO;
