import { useState, useRef } from 'react';
import styled from 'styled-components';
import useDoubleClick from 'use-double-click';

const DoubleClickDemo = () => {
  const buttonRef = useRef();
  const [onSingleClickCount, setSingleClick] = useState(0);
  const [onDoubleClickCount, setDoubleClick] = useState(0);
  const [nativeClickCount, setNativeSingleClick] = useState(0);
  const [nativeDoubleClickCount, setNativeDoubleClick] = useState(0);

  useDoubleClick({
    onSingleClick: () => setSingleClick(onSingleClickCount + 1),
    onDoubleClick: () => setDoubleClick(onDoubleClickCount + 1),
    ref: buttonRef,
    latency: 250
  });

  return (
    <DemoContainer>
      <Column>
        <h3>Native onClick() + onDoubleClick()</h3>
        <StyledButton
          onClick={() => setNativeSingleClick(nativeClickCount + 1)}
          onDoubleClick={() => setNativeDoubleClick(nativeDoubleClickCount + 1)}
          type="button"
        >
          Click Me
        </StyledButton>
        <span>
          [<AccentColor>native</AccentColor>] onClick:{' '}
          <AccentColor>{nativeClickCount}</AccentColor>
        </span>
        <span>
          [<AccentColor>native</AccentColor>] onDoubleClick:{' '}
          <AccentColor>{nativeDoubleClickCount}</AccentColor>
        </span>
      </Column>

      <Column>
        <h3>useDoubleClick() Hook</h3>
        <StyledButton ref={buttonRef} type="button">
          Click Me
        </StyledButton>
        <span>
          [<AccentColor>hook</AccentColor>] onSingleClick:{' '}
          <AccentColor>{onSingleClickCount}</AccentColor>
        </span>
        <span>
          [<AccentColor>hook</AccentColor>] onDoubleClick:{' '}
          <AccentColor>{onDoubleClickCount}</AccentColor>
        </span>
      </Column>
    </DemoContainer>
  );
};

export default DoubleClickDemo;

const AccentColor = styled.span`
  color: ${({ theme }) => theme.pageContentLinkHoverColor};
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  > h3 {
    font-size: 1.3em;
    margin-top: 0;
    margin-bottom: 1.5em;
    text-align: center;
  }
  > span {
    font-size: 1.2em;
    margin-top: 1.5em;
  }
`;

const DemoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 2em 0;
  padding: 2em;
  border-color: ${({ theme }) => theme.pageContentLinkHoverColor};
  border-width: 1px;
  border-style: solid;
  @media (max-width: 800px) {
    flex-direction: column;
    div:first-of-type {
      margin-bottom: 2em;
    }
  }
`;

const StyledButton = styled.button`
  transition: all 0.2s linear;
  transition-property: border-color, background-color, color;
  color: ${({ theme }) => theme.pageContentFontColor};
  background-color: ${({ theme }) => theme.accentColor};
  border-color: ${({ theme }) => theme.popoutMenuBorderColor};
  border-width: 2px;
  border-style: solid;
  border-radius: 5px;
  line-height: 2.5em;
  font-size: 1.2em;
  padding: 0 10px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  :focus {
    outline: none;
  }
  :hover,
  :active {
    border-color: ${({ theme }) => theme.pageContentLinkHoverColor};
    color: ${({ theme }) => theme.pageContentLinkHoverColor};
    background-color: ${({ theme }) => theme.accentHoverColor};
    cursor: pointer;
  }
`;
