/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spring, animated, interpolate } from 'react-spring/renderprops.cjs';
import ParticleField from 'react-particles-webgl';
import { LazyImage } from 'react-lazy-images';
import particlesConfig from './particlesConfig';

export default class IntroBanner extends React.Component {
  static propTypes = {
    /* True if the current page transition animation is in progress */
    routeIsAnimating: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // Assume initial *.webp browser support
      webpSupport: true
    };
  }

  componentDidMount() {
    // Check browser for webp support, set state accordingly
    this.checkWebpSupport();
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

  render() {
    const { webpSupport } = this.state;
    const { routeIsAnimating } = this.props;

    // Starting position of stars
    const from = {
      opacity: 0,
      translateY: 0,
      scale: 0.5
    };

    // Expand starfield to fill background
    const to = {
      opacity: 1,
      translateY: 1,
      scale: 1
    };

    const imgSrc = webpSupport
      ? 'url(/static/IntroBannerBG.webp)'
      : 'url(/static/IntroBannerBG.png)';

    return (
      <BannerContainer>
        <Spring
          native
          from={routeIsAnimating ? to : from}
          to={routeIsAnimating ? from : to}
        >
          {({ opacity, translateY, scale }) => (
            <AnimatedContainer
              style={{
                opacity,
                transform: interpolate(
                  [translateY, scale],
                  (translateY, scale) =>
                    `scale(${scale}) translateY(${translateY}px)`
                )
              }}
            >
              <ParticleField config={particlesConfig} />
            </AnimatedContainer>
          )}
        </Spring>

        <LazyImage
          loadEagerly
          src={imgSrc}
          alt=""
          actual={() => (
            <Spring native from={{ opacity: 0 }} to={{ opacity: 1 }}>
              {props => (
                <AnimatedSpaceBackgroundImg style={props} imgSrc={imgSrc} />
              )}
            </Spring>
          )}
        />
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
