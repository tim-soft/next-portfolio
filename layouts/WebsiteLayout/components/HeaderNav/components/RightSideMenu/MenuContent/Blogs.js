import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { getSortedPosts } from 'data/BlogPosts';
import { DateAndDuration } from 'components/Blog';
import LocationTagline from 'components/LocationTagline';
import { MenuContent, MenuList, MenuListItem, MenuFooter } from './components';

const BlogList = () => {
    // Get blog posts, sorted newest to oldest
    const sortedPosts = getSortedPosts({ order: 'desc' });

    return (
        <MenuContent>
            <MenuList>
                {sortedPosts.map(
                    ({ title, description, logo, href, date, readTime }) => (
                        <MenuListItem key={title}>
                            <Link href={href}>
                                <LinkContainer>
                                    <LogoContainer>
                                        <PostLogo
                                            src={logo}
                                            alt="Blog post logo"
                                        />
                                    </LogoContainer>
                                    <PostContent>
                                        <TitleContainer>
                                            <PostTitle>{title}</PostTitle>
                                            <DateContainer>
                                                <DateAndDuration
                                                    date={date}
                                                    readTime={readTime}
                                                />
                                            </DateContainer>
                                        </TitleContainer>
                                        <PostDescription>
                                            {description}
                                        </PostDescription>
                                    </PostContent>
                                </LinkContainer>
                            </Link>
                        </MenuListItem>
                    )
                )}
            </MenuList>
            {/* Emoji found with https://emojipedia.org/ */}
            <MenuFooter>
                <LocationTagline />
            </MenuFooter>
        </MenuContent>
    );
};

export default BlogList;

const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    width: 100%;
`;

const TitleContainer = styled.div``;

const DateContainer = styled.span`
    font-size: 0.8em;
`;

const LogoContainer = styled.div`
    width: 100px;
`;

const PostTitle = styled.h2`
    font-weight: normal;
    margin: 0 0 2px 0;
`;

const PostContent = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    margin: 25px 0 0 0;
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
    /* border-radius: 100px; */
`;
