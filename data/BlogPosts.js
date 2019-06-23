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
    href: '/blog/dynamic-theming-with-styled-components-and-nextjs',
    title: 'Dynamic Theming with Styled Components and NextJS',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
  justo eget magna fermentum iaculis. Tristique senectus et netus et
  malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
  penatibus et magnis dis.`,
    logo: '/static/blog-logos/styled-components.png',
    readTime: 15,
    date: 'Mon Jun 22 2019 14:17:57 GMT-0700 (Pacific Daylight Time)'
  },
  {
    href: '/blog/react-always-throw-away-your-event-listeners',
    title: 'Always Throw Away Your Event Listeners',
    description: `Unlike your React components, the event listeners they've created 
    don't magically disappear after their UI unmounts from the DOM. Undisposed event 
    listeners will linger in your browser to haunt future components.`,
    logo: '/static/language-logos/react.svg',
    readTime: 25,
    date: 'Mon May 3 2019 14:17:57 GMT-0700 (Pacific Daylight Time)'
  },
  {
    href: '/blog/operating-system-dark-mode-in-your-css',
    title: 'Dark Mode: OS Level Control In Your CSS',
    description: `Light/Dark mode via @media(prefers-color-scheme: dark)`,
    logo: '/static/language-logos/css.svg',
    readTime: 3,
    date: 'Mon May 5 2019 14:17:57 GMT-0700 (Pacific Daylight Time)'
  },
  {
    href: '/blog/pretty-printing-javascript-object-literals',
    title: 'Pretty Printing Javascript Object Literals',
    description: `Pretty printing javascript objects as JSON is easy, but what if you wanted to print the object 
    as it appears in your code editor?`,
    logo: '/static/language-logos/javascript.svg',
    readTime: 5,
    date: 'Mon May 7 2019 14:17:57 GMT-0700 (Pacific Daylight Time)'
  },
  {
    href: '/blog/building-react-code-blocks-with-prism',
    title: 'Building React Code Blocks with PrismJS',
    description: `Easily reusable syntax highlighted code blocks as React components`,
    logo: '/static/blog-logos/prismjs.svg',
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
