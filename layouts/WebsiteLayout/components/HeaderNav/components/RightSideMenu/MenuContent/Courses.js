import React from 'react';
import styled from 'styled-components';
import CourseData from 'data/Courses';
import { MenuContent, MenuList, MenuListItem, MenuFooter } from './components';

const CourseList = () => (
  <MenuContent>
    <MenuList>
      {CourseData.map(({ title, description, logoSrc, logoAlt }) => (
        <MenuListItem key={title}>
          <LogoContainer>
            <CourseLogo src={logoSrc} alt={logoAlt} />
          </LogoContainer>
          <CourseContent>
            <CourseTitle>{title}</CourseTitle>
            <p>{description}</p>
          </CourseContent>
        </MenuListItem>
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

export default CourseList;

const LogoContainer = styled.div`
  width: 100px;
`;

const CourseTitle = styled.h2`
  font-weight: normal;
  margin: 0;
`;

const CourseContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const CourseLogo = styled.img`
  width: 100%;
  max-height: 45px;
`;
