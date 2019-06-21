import PropTypes from 'prop-types';
import NextSEO, { BlogJsonLd } from 'next-seo';
import { withRouter } from 'next/router';
import BlogData from 'data/BlogPosts';

const BlogSEO = ({ baseUrl, router }) => {
  const { route } = router;

  // Get index of current blog post
  const blogPost = BlogData.find(post => post.href === route);

  if (!blogPost) return null;

  return (
    <>
      <NextSEO
        config={{
          title: blogPost.title,
          description: blogPost.description,
          canonical: `${baseUrl}/${route}`,
          openGraph: {
            url: `${baseUrl}/${route}`,
            title: blogPost.title,
            description: blogPost.description,
            images: [
              `${baseUrl}${blogPost.logo}`,
              `${baseUrl}/static/avatar.png`
            ],
            type: 'article',
            article: {
              publishedTime: blogPost.date,
              section: 'Technology',
              authors: [baseUrl]
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
        url={`${baseUrl}/${route}`}
        title={blogPost.title}
        images={[`${baseUrl}${blogPost.logo}`, `${baseUrl}/static/avatar.png`]}
        datePublished={blogPost.date}
        authorName="Tim Ellenberger"
        description={blogPost.description}
      />
    </>
  );
};

BlogSEO.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  router: PropTypes.shape({
    route: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(BlogSEO);
