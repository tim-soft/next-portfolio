import React from 'react';
import styled from 'styled-components';
import { Spring, animated, config } from '@react-spring/web';
import { LazyImage } from 'react-lazy-images';
import ParticleField from 'react-particles-webgl';
import SiteVersionFAB from 'components/SiteVersionFAB';
import particlesConfig from './particlesConfig';

export default class IntroBanner extends React.Component {
  constructor() {
    super();
    this.state = {
      // Assume initial *.webp browser support
      webpSupport: true,
      backgroundAnimDone: false,
      clientSide: false
    };
  }

  componentDidMount() {
    // Check browser for webp support, set state accordingly
    this.checkWebpSupport();
    this.setState({ clientSide: true });
  }

  /**
   * Sanity check the browser if we can use *.webp format with transparency
   *
   * Compression on webp for the background image is much better than *.png
   * and cuts down on the load time.
   */
  checkWebpSupport = () => {
    const img = new Image();

    // Determine if the loaded webp is the correct dimensions
    img.onload = () => {
      const webpSupport = img.width > 0 && img.height > 0;

      // Trigger re-render with *.png background
      if (!webpSupport) this.setState({ webpSupport: false });
    };

    // If there's some error loading webp, re-render with *.png background
    img.onerror = () => {
      this.setState({ webpSupport: false });
    };

    // A basic webp image with an alpha channel
    img.src =
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==';
  };

  setBackgroundAnimDone = () => this.setState({ backgroundAnimDone: true });

  render() {
    const { webpSupport, backgroundAnimDone, clientSide } = this.state;

    const imgSrc = webpSupport
      ? 'url(/static/IntroBannerBG.webp)'
      : 'url(/static/IntroBannerBG.png)';

    return (
      <BannerContainer>
        {clientSide && (
          <Spring
            native
            from={{ opacity: 0, transform: 'scale(0)' }}
            to={
              backgroundAnimDone
                ? { opacity: 1, transform: 'scale(1)' }
                : { opacity: 0, transform: 'scale(0)' }
            }
            config={config.slow}
          >
            {animStyles => (
              <AnimatedContainer style={animStyles}>
                <ParticleField config={particlesConfig} />
              </AnimatedContainer>
            )}
          </Spring>
        )}

        <LazyImage
          loadEagerly
          src={imgSrc}
          alt=""
          actual={() => (
            <Spring
              native
              from={{ opacity: 0, transform: 'translateY(100%)' }}
              to={{ opacity: 1, transform: 'translateY(0px)' }}
              onRest={this.setBackgroundAnimDone}
            >
              {props => (
                <AnimatedSpaceBackgroundImg style={props} imgSrc={imgSrc} />
              )}
            </Spring>
          )}
        />
        <SiteVersionFAB />
      </BannerContainer>
    );
  }
}

const AnimatedContainer = animated(styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`);

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  height: 100vh;
  background-image: radial-gradient(
    circle,
    #e032d1,
    #b639c7,
    #8e3bb9,
    #6739a7,
    #413493,
    #2b398c,
    #163b83,
    #003c79,
    #004676,
    #004a5c,
    #004a34,
    #014606
  );
`;

const AnimatedSpaceBackgroundImg = animated(styled.div`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: ${({ imgSrc }) => imgSrc};
`);
