import PropTypes from 'prop-types';
import styled from 'styled-components';

const BlogEditPostFAB = ({ route }) => (
    <a
        href={`https://github.com/tim-soft/next-portfolio/blob/master/pages${route}.js`}
        target="_blank"
        rel="noopener noreferrer"
    >
        <FABContainer>
            <SiteLogo
                src="/static/android-chrome-192x192.png"
                alt="Edit Post"
            />
            <FooterText>
                <code>Bug?</code>
                <code>Edit Post</code>
            </FooterText>
        </FABContainer>
    </a>
);

BlogEditPostFAB.propTypes = {
    route: PropTypes.string.isRequired
};

export default BlogEditPostFAB;

const FooterText = styled.p`
    display: flex;
    flex-direction: column;
    margin-top: 6px;
    margin-bottom: 0;
    text-align: center;
    line-height: 1.3em;
`;

const FABContainer = styled.div`
    @media (max-width: ${({ theme }) =>
            `${theme.pageContentWidth + 110 * 2 + 10}px`}) {
        display: none;
    }
    position: fixed;
    bottom: 10px;
    right: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 8px;
    color: ${({ theme }) => theme.pageContentFontColor};
    border-radius: 8px;
    border-color: transparent;
    border-width: 1px;
    border-style: solid;
    :hover {
        background-color: ${({ theme }) => theme.accentHoverColor};
        border-color: ${({ theme }) => theme.popoutMenuBorderColor};
        color: ${({ theme }) => theme.pageContentLinkHoverColor};
    }
`;

const SiteLogo = styled.img`
    height: 50px;
`;
