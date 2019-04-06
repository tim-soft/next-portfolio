import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import CourseMenuContent from './MenuContent/Courses';

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
      menuWidth={350}
      menuHeight={500}
      useScroll
    >
      <CourseMenuContent />
    </MenuItem>
  </RightSideMenu>
);

const RightSideMenu = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media (${({ theme }) => theme.breakpoints.desktopNav}) {
    display: none;
  }
`;
