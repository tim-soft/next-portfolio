import React from 'react';
import styled from 'styled-components';

const CourseList = () => (
  <MenuContent>
    <MenuList>
      <MenuListItem>
        <LogoContainer>
          <CourseLogo
            src="https://cdn.svgporn.com/logos/react.svg"
            alt="React"
          />
        </LogoContainer>
        <CourseContent>
          <CourseTitle>React</CourseTitle>
          <p>Coming Soon...</p>
        </CourseContent>
      </MenuListItem>

      <MenuListItem>
        <LogoContainer>
          <CourseLogo
            src="https://cdn.svgporn.com/logos/graphql.svg"
            alt="GraphQL"
          />
        </LogoContainer>
        <CourseContent>
          <CourseTitle>GraphQL</CourseTitle>
          <p>Coming Soon...</p>
        </CourseContent>
      </MenuListItem>

      <MenuListItem>
        <LogoContainer>
          <CourseLogo
            src="https://cdn.svgporn.com/logos/nextjs.svg"
            alt="Next.js"
          />
        </LogoContainer>
        <CourseContent>
          <CourseTitle>Next.js</CourseTitle>
          <p>Coming Soon...</p>
        </CourseContent>
      </MenuListItem>

      <MenuListItem>
        <LogoContainer>
          <CourseLogo src="https://cdn.svgporn.com/logos/npm.svg" alt="NPM" />
        </LogoContainer>
        <CourseContent>
          <CourseTitle>Publishing to NPM</CourseTitle>
          <p>Coming Soon...</p>
        </CourseContent>
      </MenuListItem>

      <MenuListItem>
        <LogoContainer>
          <CourseLogo
            src="https://cdn.svgporn.com/logos/javascript.svg"
            alt="JavaScript"
          />
        </LogoContainer>
        <CourseContent>
          <CourseTitle>JavaScript ES6+</CourseTitle>
          <p>Coming Soon...</p>
        </CourseContent>
      </MenuListItem>
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
`;

const BioParagraph = styled.div`
  color: white;
  margin: 20px !important;
  line-height: 21px;
  text-align: center;
  margin-top: auto;
`;
