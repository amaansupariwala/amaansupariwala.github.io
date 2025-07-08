import React from 'react';
import styled, { keyframes } from 'styled-components';

// Pac-Man mouth animation
const pacMouthAnimation = keyframes`
  0%, 100% {
    clip-path: polygon(0 0, 0 100%, 100% 50%);
  }
  50% {
    clip-path: polygon(0 0, 0 100%, 100% 0, 100% 100%);
  }
`;

// Pac-Man movement around the border
const pacMovement = keyframes`
  0% {
    left: -20px;
    top: 10px;
    transform: rotate(0deg);
  }
  24.9% {
    left: calc(100vw - 20px);
    top: 10px;
    transform: rotate(0deg);
  }
  25% {
    left: calc(100vw - 20px);
    top: 10px;
    transform: rotate(90deg);
  }
  49.9% {
    left: calc(100vw - 20px);
    top: calc(100vh - 20px);
    transform: rotate(90deg);
  }
  50% {
    left: calc(100vw - 20px);
    top: calc(100vh - 20px);
    transform: rotate(180deg);
  }
  74.9% {
    left: -20px;
    top: calc(100vh - 20px);
    transform: rotate(180deg);
  }
  75% {
    left: -20px;
    top: calc(100vh - 20px);
    transform: rotate(270deg);
  }
  99.9% {
    left: -20px;
    top: 10px;
    transform: rotate(270deg);
  }
  100% {
    left: -20px;
    top: 10px;
    transform: rotate(0deg);
  }
`;

// Container for the entire border system
const BorderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: ${props => props.theme.zIndices.pacBorder};
  
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

// Border frames (top, right, bottom, left)
const BorderFrame = styled.div`
  position: absolute;
  background-color: #000;
  
  &.top {
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
  }
  
  &.right {
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
  }
  
  &.bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
  }
  
  &.left {
    top: 0;
    left: 0;
    width: 20px;
    height: 100%;
  }
`;

// Dots along the border
const BorderDot = styled.span`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.theme.colors.gradient.purpleGold};
  
  &.top {
    top: 7px;
  }
  
  &.right {
    right: 7px;
  }
  
  &.bottom {
    bottom: 7px;
  }
  
  &.left {
    left: 7px;
  }
`;

// Pac-Man sprite
const PacSprite = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  background: ${props => props.theme.colors.secondary};
  border-radius: 50%;
  animation: 
    ${pacMovement} 10s linear infinite,
    ${pacMouthAnimation} 0.5s ease-in-out infinite;
  will-change: transform;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 2px;
    background: #000;
    border-radius: 50%;
  }
`;

const PacBorder = () => {
  // Calculate dots for each border side
  const generateDots = (side, count) => {
    const dots = [];
    for (let i = 0; i < count; i++) {
      let style = {};
      
      switch (side) {
        case 'top':
          style = { left: `${(i * 60) + 60}px` };
          break;
        case 'right':
          style = { top: `${(i * 60) + 60}px` };
          break;
        case 'bottom':
          style = { left: `${(i * 60) + 60}px` };
          break;
        case 'left':
          style = { top: `${(i * 60) + 60}px` };
          break;
        default:
          break;
      }
      
      dots.push(
        <BorderDot
          key={i}
          className={side}
          style={style}
        />
      );
    }
    return dots;
  };

  // Calculate approximate dot counts based on viewport
  const topDots = Math.floor((window.innerWidth - 120) / 60);
  const rightDots = Math.floor((window.innerHeight - 120) / 60);
  const bottomDots = Math.floor((window.innerWidth - 120) / 60);
  const leftDots = Math.floor((window.innerHeight - 120) / 60);

  return (
    <BorderContainer className="pac-border">
      {/* Border frames */}
      <BorderFrame className="top" />
      <BorderFrame className="right" />
      <BorderFrame className="bottom" />
      <BorderFrame className="left" />
      
      {/* Dots along borders */}
      {generateDots('top', topDots)}
      {generateDots('right', rightDots)}
      {generateDots('bottom', bottomDots)}
      {generateDots('left', leftDots)}
      
      {/* Pac-Man sprite */}
      <PacSprite className="pac-sprite" />
    </BorderContainer>
  );
};

export default PacBorder; 