/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Scrollbar from 'components/Scrollbar';
import { Transition, animated } from '@react-spring/web';
import ConfigViewer from './components/ConfigViewer';
import DatUIPane from './components/DatUIPane';

/**
 * A DatGUI for tweaking the ParticleField settings
 *
 * @param {object} datConfig current configuration for particle field
 * @param {function} handleDatUpdate a function for writing the current state of config UI to ParticleField
 */
class DatUI extends React.Component {
    static propTypes = {
        datConfig: PropTypes.object.isRequired,
        handleDatUpdate: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            showConfig: false,
        };
    }

    render() {
        const { isOpen, showConfig } = this.state;
        const { datConfig, handleDatUpdate } = this.props;

        return (
            <StyledScrollWrapper>
                <ControlContainer>
                    <ControlButton
                        onClick={() =>
                            this.setState({
                                showConfig: !showConfig,
                                isOpen: true,
                            })
                        }
                    >
                        Config
                    </ControlButton>
                    <ControlButton
                        onClick={() => this.setState({ isOpen: !isOpen })}
                    >
                        Show/Hide
                    </ControlButton>
                </ControlContainer>
                <Transition
                    native
                    items={isOpen}
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0 }}
                >
                    {(isOpen) =>
                        isOpen &&
                        (({ opacity }) => (
                            <animated.div
                                style={{
                                    opacity,
                                }}
                            >
                                <StyledScrollbar>
                                    <ScrollbarContentContainer>
                                        <Transition
                                            native
                                            items={showConfig}
                                            initial={{
                                                position: 'absolute',
                                                opacity: 1,
                                            }}
                                            from={{
                                                position: 'absolute',
                                                opacity: 0,
                                            }}
                                            enter={{ opacity: 1 }}
                                            leave={{ opacity: 0 }}
                                        >
                                            {(showConfig) =>
                                                showConfig
                                                    ? ({
                                                          opacity,
                                                          position,
                                                      }) => (
                                                          <animated.div
                                                              style={{
                                                                  position,
                                                                  opacity,
                                                                  width: '100%',
                                                              }}
                                                          >
                                                              <ConfigViewer
                                                                  datConfig={
                                                                      datConfig
                                                                  }
                                                              />
                                                          </animated.div>
                                                      )
                                                    : ({
                                                          opacity,
                                                          position,
                                                      }) => (
                                                          <animated.div
                                                              style={{
                                                                  position,
                                                                  opacity,
                                                                  width: '100%',
                                                              }}
                                                          >
                                                              <DatUIPane
                                                                  datConfig={
                                                                      datConfig
                                                                  }
                                                                  handleDatUpdate={
                                                                      handleDatUpdate
                                                                  }
                                                              />
                                                          </animated.div>
                                                      )
                                            }
                                        </Transition>
                                    </ScrollbarContentContainer>
                                </StyledScrollbar>
                            </animated.div>
                        ))
                    }
                </Transition>
            </StyledScrollWrapper>
        );
    }
}

export default DatUI;

const ControlContainer = styled.div`
    max-width: 370px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #1a1a1ad4;
    height: 34px;
    margin: 0 18px 10px 10px;
    border: 1px solid #dad5cb;
    overflow: hidden;
`;

const ControlButton = styled.button`
    background: none;
    color: #eeeeee;
    font-size: 1.4em;
    transition: color 0.2s linear;
    border: none;
    :hover {
        cursor: pointer;
        color: ${({ theme }) => theme.pageContentLinkHoverColor};
    }
    :focus {
        outline: none;
    }
`;

const ScrollbarContentContainer = styled.div`
    position: relative;
    height: 100%;
    min-height: 100%;
    margin: 0 10px;
`;

const StyledScrollWrapper = styled.div`
    z-index: 20;
    position: absolute;
    right: 10px;
    top: 100px;
    max-width: 400px;
    width: 100%;

    @media (max-width: 512px) {
        top: 180px;
    }
`;

const StyledScrollbar = styled(Scrollbar)`
    width: 100%;
    height: calc(100vh - 180px) !important;

    /* RepoTag hidden, config underneath FPSCounter */
    @media (max-width: 512px) {
        height: calc(100vh - 260px) !important;
    }

    /* Small screen, RepoTag visible */
    @media (min-width: 512px) {
        height: calc(100vh - 310px) !important;
    }

    /* Large screen, RepoTag visible */
    @media (min-width: 1140px) {
        height: calc(100vh - 167px) !important;
    }
`;
