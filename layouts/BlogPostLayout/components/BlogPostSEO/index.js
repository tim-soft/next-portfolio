import PropTypes from 'prop-types';
import NextSEO, { BlogJsonLd, BreadcrumbJsonLd } from 'next-seo';

const BASE_URL = 'https://timellenberger.com';

/**
 * Inserts blog-post optimized structured data into the page
 *
 * https://developers.google.com/search/docs/guides/intro-structured-data
 * https://search.google.com/structured-data/testing-tool
 */
const BlogPostSEO = ({ blogPost, route }) => (
  <>
    <NextSEO
      config={{
        title: blogPost.title,
        description: blogPost.description,
        canonical: `${BASE_URL}${route}`,
        openGraph: {
          url: `${BASE_URL}${route}`,
          title: blogPost.title,
          description: blogPost.description,
          images: [
            {
              url: `${BASE_URL}${blogPost.logo}`,
              alt: 'Blog Post Logo'
            }
          ],
          type: 'article',
          article: {
            publishedTime: blogPost.date,
            section: 'Technology',
            authors: [BASE_URL]
          },
          site_name: 'Coding, Musings and Adventures of Tim Ellenberger',
          locale: 'en_US',
          profile: {
            firstName: 'Tim',
            lastName: 'Ellenberger',
            username: 'tim-soft',
            gender: 'male'
          }
        }
      }}
    />
    <BlogJsonLd
      url={`${BASE_URL}${route}`}
      title={blogPost.title}
      images={[`${BASE_URL}${blogPost.logo}`, `${BASE_URL}/static/avatar.png`]}
      datePublished={blogPost.date}
      authorName="Tim Ellenberger"
      description={blogPost.description}
    />
    <BreadcrumbJsonLd
      itemListElements={[
        {
          position: 1,
          name: BASE_URL,
          item: BASE_URL
        },
        {
          position: 2,
          name: 'Blog',
          item: `${BASE_URL}/blog`
        },
        {
          position: 3,
          name: blogPost.title,
          item: `${BASE_URL}${route}`
        }
      ]}
    />
  </>
);

BlogPostSEO.propTypes = {
  blogPost: PropTypes.shape({
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    readTime: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired,
  route: PropTypes.string.isRequired
};

export default BlogPostSEO;
