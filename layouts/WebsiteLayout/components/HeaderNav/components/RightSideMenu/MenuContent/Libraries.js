import React from 'react';
import styled from 'styled-components';
import { FaBookOpen } from 'react-icons/fa';
import { BlogLink } from 'components/Blog';
import { ProjectBadge, ProjectBadgeList } from 'components/Portfolio';
import LocationTagline from 'components/LocationTagline';
import libraries from 'data/Libraries';
import {
    MenuContent,
    MenuList,
    MenuListItem,
    MenuFooter,
    MenuHeader,
    LinkWrapper,
} from './components';

const LibrariesList = () => (
    <MenuContent>
        <MenuHeader>
            <DocsHeading>
                <FaBookOpen />
                Documentation
                <FaBookOpen />
            </DocsHeading>
        </MenuHeader>
        <MenuList>
            {libraries.map(({ name, href, tagline, logoSrc, badges }) => (
                <MenuListItem key={name}>
                    <LinkWrapper href={href}>
                        <LogoContainer>
                            <PostLogo src={logoSrc} alt="Library Logo" />
                        </LogoContainer>
                        <PostContent>
                            <TitleContainer>
                                <TitleLink href={href}>
                                    <PostTitle>{name}</PostTitle>
                                </TitleLink>
                                <DateContainer>
                                    <ProjectBadgeList
                                        style={{ marginTop: '0.6em' }}
                                    >
                                        {badges.map(({ badgeUrl, linkUrl }) => (
                                            <ProjectBadge
                                                style={{ height: '20px' }}
                                                badgeUrl={badgeUrl}
                                                linkUrl={linkUrl}
                                                key={linkUrl}
                                            />
                                        ))}
                                    </ProjectBadgeList>
                                </DateContainer>
                            </TitleContainer>
                            <PostDescription>{tagline}</PostDescription>
                        </PostContent>
                    </LinkWrapper>
                </MenuListItem>
            ))}
        </MenuList>
        {/* Emoji found with https://emojipedia.org/ */}
        <MenuFooter>
            <LocationTagline />
        </MenuFooter>
    </MenuContent>
);

export default LibrariesList;

const TitleLink = styled(BlogLink)`
    :hover {
        color: unset;
    }
`;

const DocsHeading = styled.h2`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    > svg {
        margin: 0 0.5em;
    }
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
