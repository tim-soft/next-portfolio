/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import styled from 'styled-components';

const GRAPH_HEIGHT = 29;
const GRAPH_WIDTH = 70;

class FPSStats extends Component {
  constructor(props) {
    super(props);
    const currentTime = +new Date();
    this.state = {
      frames: 0,
      prevTime: currentTime,
      fps: []
    };
  }

  componentDidMount() {
    const onRequestAnimationFrame = () => {
      this.calcFPS();
      this.afRequest = window.requestAnimationFrame(onRequestAnimationFrame);
    };
    this.afRequest = window.requestAnimationFrame(onRequestAnimationFrame);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.fps !== nextState.fps || this.props !== nextProps;
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.afRequest);
  }

  calcFPS = () => {
    const { frames, prevTime } = this.state;

    const currentTime = +new Date();
    this.setState(state => ({
      frames: state.frames + 1
    }));
    if (currentTime > prevTime + 1000) {
      let fps = Math.round((frames * 1000) / (currentTime - prevTime));
      fps = this.state.fps.concat(fps);
      const sliceStart = Math.min(fps.length - GRAPH_WIDTH, 0);
      fps = fps.slice(sliceStart, fps.length);
      this.setState({
        fps,
        frames: 0,
        prevTime: currentTime
      });
    }
  };

  render() {
    const { fps } = this.state;
    // const maxFps = Math.max.apply(Math.max, fps);

    return (
      <GraphContainer>
        <GraphTitle>{fps[fps.length - 1]} FPS</GraphTitle>
        {/* <Graph>
          {fps.map((fps, i) => (
            <GraphBar
              key={`fps-${i}`}
              height={(76 * fps) / maxFps}
              fps={fps.length - 1 - i}
            />
          ))}
        </Graph> */}
      </GraphContainer>
    );
  }
}

export default FPSStats;

const GraphTitle = styled.h2`
  font-size: 14px;
`;

// const Graph = styled.div`
//   position: relative;
//   height: 76px;
//   width: 100px;
//   background-color: #282844;
//   box-sizing: border-box;
// `;

// const GraphBar = styled.div`
//   position: absolute;
//   bottom: 0;
//   right: ${({ fps }) => fps}px;
//   height: ${({ height }) => height}px;
//   width: 1px;
//   background-color: #00ffff;
//   box-sizing: border-box;
// `;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20;
  position: fixed;
  max-height: 100%;
  max-width: 100%;
  padding: 3px;
  background-color: #000;
  color: #00ffff;
  box-sizing: border-box;
  pointer-events: none;
  top: 100px;
  right: auto;
  bottom: auto;
  left: 10px;
`;
