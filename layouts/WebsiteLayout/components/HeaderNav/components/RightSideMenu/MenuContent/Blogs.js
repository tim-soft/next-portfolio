import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { getSortedPosts } from 'data/BlogPosts';
import { MenuContent, MenuList, MenuListItem, MenuFooter } from './components';

const BlogList = () => {
  // Get blog posts, sorted newest to oldest
  const sortedPosts = getSortedPosts({ order: 'desc' });

  return (
    <MenuContent>
      <MenuList>
        {sortedPosts.map(({ title, description, logo, href }) => (
          <Link href={href} key={title}>
            <MenuListItem>
              <LogoContainer>
                <PostLogo src={logo} alt="Blog post logo" />
              </LogoContainer>
              <PostContent>
                <PostTitle>{title}</PostTitle>
                <PostDescription>{description}</PostDescription>
              </PostContent>
            </MenuListItem>
          </Link>
        ))}
      </MenuList>
      {/* Emoji found with https://emojipedia.org/ */}
      <MenuFooter>
        Made with{' '}
        <span role="img" aria-label="love">
          💚
        </span>{' '}
        in Seattle
      </MenuFooter>
    </MenuContent>
  );
};

export default BlogList;

const LogoContainer = styled.div`
  width: 100px;
`;

const PostTitle = styled.h2`
  font-weight: normal;
  margin: 0;
`;

const PostContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 15px;
`;

const PostDescription = styled.p`
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
  -webkit-line-clamp: 2;
  height: calc(1em * 1.2 * 2);
  @supports (-webkit-line-clamp: 1) {
    .line-clamp:after {
      display: none !important;
    }
  }
`;

const PostLogo = styled.img`
  /* width: 100%;
  height: auto; */
  max-height: 68px;
  border-radius: 100px;
`;
