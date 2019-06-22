import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import NextSEO from 'next-seo';
import PageScrollWrapper from 'components/PageScrollWrapper';
import { generatePageTheme } from 'components/AppTheme';

const CoursesPage = ({ theme }) => (
  <>
    <NextSEO
      config={{
        title: 'React and GraphQL Courses | Tim Ellenberger',
        openGraph: {
          title: 'React and GraphQL Courses | Tim Ellenberger'
        }
      }}
    />
    <ThemeProvider theme={theme}>
      <PageScrollWrapper>
        <Title>Courses: Under Construction</Title>
      </PageScrollWrapper>
    </ThemeProvider>
  </>
);

CoursesPage.propTypes = {
  theme: PropTypes.object
};

CoursesPage.defaultProps = {
  theme: {}
};

// Generate page theme
CoursesPage.getInitialProps = async () => {
  const theme = generatePageTheme({
    fontColor: 'black',
    highlightFontColor: 'cyan',
    backgroundColor: '#9e9e9e'
  });

  return { theme };
};

export default CoursesPage;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
`;
