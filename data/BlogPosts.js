/**
 * Index for blog posts
 *
 * @href {string} link to blog post
 * @title {string} long title text shown above article
 * @description {string} long description shown in article list
 * @logo {string} image used in dropdown list of articles
 * @readTime {number} duration (in minutes) of article reading length
 * @date {string} used to sort and filter articles
 */
const BlogData = [
  {
    href: '/blog/test-blog-entry',
    title: 'Test Blog Entry',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
  justo eget magna fermentum iaculis. Tristique senectus et netus et
  malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
  penatibus et magnis dis.`,
    logo: '/static/avatar.png',
    readTime: 4,
    date: 'Mon May 1 2019 14:17:57 GMT-0700 (Pacific Daylight Time)'
  },
  {
    href: '/blog/test-blog-entry-2',
    title: 'Test Blog Entry 2',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
  justo eget magna fermentum iaculis. Tristique senectus et netus et
  malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
  penatibus et magnis dis.`,
    logo: '/static/avatar.png',
    readTime: 25,
    date: 'Mon May 3 2019 14:17:57 GMT-0700 (Pacific Daylight Time)'
  },
  {
    href: '/blog/test-blog-entry-3',
    title: 'Test Blog Entry 3',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
  justo eget magna fermentum iaculis. Tristique senectus et netus et
  malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
  penatibus et magnis dis.`,
    logo: '/static/avatar.png',
    readTime: 15,
    date: 'Mon May 5 2019 14:17:57 GMT-0700 (Pacific Daylight Time)'
  },
  {
    href: '/blog/test-blog-entry-4',
    title: 'Test Blog Entry 4',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
  justo eget magna fermentum iaculis. Tristique senectus et netus et
  malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
  penatibus et magnis dis.`,
    logo: '/static/avatar.png',
    readTime: 35,
    date: 'Mon May 7 2019 14:17:57 GMT-0700 (Pacific Daylight Time)'
  },
  {
    href: '/blog/test-blog-entry-5',
    title: 'Test Blog Entry 5',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
  justo eget magna fermentum iaculis. Tristique senectus et netus et
  malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
  penatibus et magnis dis.`,
    logo: '/static/avatar.png',
    readTime: 13,
    date: 'Mon May 9 2019 14:17:57 GMT-0700 (Pacific Daylight Time)'
  }
];

export default BlogData;

const getOldestToNewestPosts = () =>
  [...BlogData].sort((a, b) => new Date(a.date) - new Date(b.date));

const getNewestToOldestPosts = () =>
  [...BlogData].sort((a, b) => new Date(b.date) - new Date(a.date));

export const getSortedPosts = ({ order }) => {
  switch (order) {
    case 'asc':
      return getOldestToNewestPosts();
    case 'desc':
      return getNewestToOldestPosts();
    default:
      return getNewestToOldestPosts();
  }
};
