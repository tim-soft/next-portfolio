import PropTypes from 'prop-types';
import styled from 'styled-components';
import DateAndDuration from '../DateAndDuration';
import StyledLink from '../BlogLink';

const IndexListItem = ({ title, description, href, date, readTime }) => (
    <BlogItem>
        <header>
            <BlogTitle>
                <StyledLink href={href} paragraph>
                    {title}
                </StyledLink>
            </BlogTitle>
            <small>
                <DateAndDuration date={date} readTime={readTime} />
            </small>
        </header>
        <BlogDescription>{description}</BlogDescription>
    </BlogItem>
);

IndexListItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    readTime: PropTypes.number.isRequired,
};

export default IndexListItem;

const BlogItem = styled.article`
    display: flex;
    align-items: 'flex-start';
    flex-direction: column;
    margin: 1em 0 3em 0;
    width: 100%;
    > * {
        margin: 0.4em 0 0.7em 0;
    }
    header > small {
        font-size: 85%;
    }
`;

const BlogTitle = styled.h2`
    font-size: 1.7em;
    margin: 13px 0 7px 0;
    font-weight: normal;
    a {
        text-decoration: none;
    }
`;

const BlogDescription = styled.p`
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
    -webkit-line-clamp: 5;
    max-height: calc(1em * 1.2 * 5);
    @supports (-webkit-line-clamp: 1) {
        .line-clamp:after {
            display: none !important;
        }
    }
`;
