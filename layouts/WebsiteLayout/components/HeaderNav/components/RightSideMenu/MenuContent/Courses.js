import React from 'react';
import styled from 'styled-components';
import Color from 'color';
import CourseData from 'data/Courses';

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
    <BioParagraph>
      Made with{' '}
      <span role="img" aria-label="love">
        💚
      </span>{' '}
      in Seattle
    </BioParagraph>
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

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const MenuList = styled.ul`
  width: inherit;
  list-style-type: none;
  padding-inline-start: unset;
  margin-block-start: unset;
  margin-block-end: unset;
`;

const MenuListItem = styled.li`
  display: flex;
  color: black;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 15px;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 1px;
  transition: background-color 0.3s linear;
  :hover {
    background: ${({ theme }) => {
      // Calculate a hover color lighter or darker than background
      // based on how bright the background color is
      const color = Color(theme.pageBackgroundColor);
      const luminosity = color.luminosity();

      if (luminosity < 0.3)
        return Color(theme.pageBackgroundColor)
          .darken(0.05)
          .hex();

      return Color(theme.pageBackgroundColor)
        .lighten(0.1)
        .hex();
    }};
    cursor: pointer;
  }
`;

const BioParagraph = styled.div`
  color: white;
  margin: 20px !important;
  line-height: 21px;
  text-align: center;
  margin-top: auto;
`;
