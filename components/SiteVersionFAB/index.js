import styled from 'styled-components';
import { name, version } from '../../package.json';

const SiteVersionFAB = () => (
    <a
        href="https://github.com/tim-soft/next-portfolio"
        target="_blank"
        rel="noopener noreferrer"
    >
        <SiteVersionContainer>
            <SiteLogo
                src="/static/android-chrome-192x192.png"
                alt="Site Logo"
            />
            <FooterText>
                <code>{name}</code>
                <br />
                <code>Version {version}</code>
            </FooterText>
        </SiteVersionContainer>
    </a>
);

export default SiteVersionFAB;

const FooterText = styled.p`
    text-align: center;
    line-height: 1.3em;
`;

const SiteVersionContainer = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
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
    p {
        margin-bottom: 0;
    }
`;

const SiteLogo = styled.img`
    height: 50px;
    /* animation: spin 1s ease-in-out 1;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  } */
`;
