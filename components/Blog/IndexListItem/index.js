import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const IndexListItem = ({ title, description, href }) => (
  <BlogItem>
    <Link href={href}>
      <BlogTitle>{title}</BlogTitle>
    </Link>
    <BlogDescription>{description}</BlogDescription>
  </BlogItem>
);

IndexListItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default IndexListItem;

const BlogItem = styled.div`
  display: flex;
  align-items: 'flex-start';
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const BlogTitle = styled.h2`
  font-weight: normal;
  transition: color 0.2s linear;
  :hover {
    color: cyan;
    cursor: pointer;
  }
`;

const BlogDescription = styled.p`
  font-weight: normal;
`;
