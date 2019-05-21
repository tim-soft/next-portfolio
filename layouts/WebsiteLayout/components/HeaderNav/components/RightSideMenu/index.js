import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import CourseMenuContent from './MenuContent/Courses';
import BlogPostMenuContent from './MenuContent/Blogs';

export default () => (
  <RightSideMenu>
    <MenuItem link="/portfolio" text="Portfolio" />

    <MenuItem link="/particles" text="ParticlesGL" />

    <MenuItem
      link="/courses"
      text="Courses"
      menuWidth={350}
      menuHeight={500}
      useScroll
    >
      <CourseMenuContent />
    </MenuItem>

    <MenuItem
      link="/blog"
      text="Blog"
      menuWidth={450}
      menuHeight={500}
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
