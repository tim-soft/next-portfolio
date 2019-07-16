import styled from 'styled-components';
import { version } from '../../package.json';

const VersionFAB = () => (
  <a
    href="https://github.com/tim-soft/next-portfolio/tree/master/pages"
    target="_blank"
    rel="noopener noreferrer"
  >
    <SiteVersionContainer>
      <SiteLogo src="/static/android-chrome-192x192.png" />
      <p>
        <code>Version {version}</code>
      </p>
    </SiteVersionContainer>
  </a>
);

export default VersionFAB;

const SiteVersionContainer = styled.div`
  /* @media (max-width: 1200px) {
    display: none;
  } */
  position: absolute;
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
