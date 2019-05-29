import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import DateAndDuration from '../DateAndDuration';

const IndexListItem = ({ title, description, href, date, readTime }) => (
  <BlogItem>
    <header>
      <Link href={href}>
        <BlogTitle>{title}</BlogTitle>
      </Link>
      <small>
        <DateAndDuration date={date} readTime={readTime} />
      </small>
    </header>
    <BlogDescription>{description}</BlogDescription>
  </BlogItem>
);

IndexListItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readTime: PropTypes.number.isRequired
};

export default IndexListItem;

const BlogItem = styled.article`
  display: flex;
  align-items: 'flex-start';
  flex-direction: column;
  margin: 1em 0;
  width: 100%;
  > * {
    margin: 0.4em 0;
  }
  header > small {
    font-size: 85%;
  }
`;

const BlogTitle = styled.h2`
  font-size: 1.7em;
  margin: 13px 0;
  font-weight: normal;
  text-decoration: underline;
  transition: color 0.2s linear;
  :hover {
    color: ${({ theme }) => theme.pageContentLinkHoverColor};
    cursor: pointer;
  }
`;

const BlogDescription = styled.p`
  display: block;
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-box-orient: vertical;
  position: relative;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 !important;
  -webkit-line-clamp: 5;
  height: calc(1em * 1.2 * 5);
  @supports (-webkit-line-clamp: 1) {
    .line-clamp:after {
      display: none !important;
    }
  }
`;
