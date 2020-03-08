import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { NextSeo } from 'next-seo';
import PageScrollWrapper from 'components/PageScrollWrapper';

const CoursesPage = ({ theme }) => (
    <>
        <NextSeo
            title="React and GraphQL Courses | Tim Ellenberger"
            openGraph={{
                title: 'React and GraphQL Courses | Tim Ellenberger'
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

export default CoursesPage;

const Title = styled.h1`
    font-size: 50px;
    text-align: center;
`;
