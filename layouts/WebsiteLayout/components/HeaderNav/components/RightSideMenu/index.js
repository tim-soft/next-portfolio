import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import BlogPostMenuContent from './MenuContent/Blogs';
import LibrariesMenuContent from './MenuContent/Libraries';

export default () => (
    <RightSideMenu>
        <MenuItem link="/portfolio" text="Portfolio" />

        <MenuItem link="/particles" text="ParticlesGL" />

        <MenuItem
            link="/portfolio"
            text="Libraries"
            menuWidth={660}
            menuHeight={600}
            useScroll
        >
            <LibrariesMenuContent />
        </MenuItem>

        <MenuItem
            link="/blog"
            text="Blog"
            menuWidth={480}
            menuHeight={600}
            useScroll
        >
            <BlogPostMenuContent />
        </MenuItem>
    </RightSideMenu>
);

const RightSideMenu = styled.nav`
    position: absolute;
    right: 0;
    display: flex;
    justify-content: flex-end;
    @media (${({ theme }) => theme.breakpoints.desktopNav}) {
        display: none;
    }
`;
