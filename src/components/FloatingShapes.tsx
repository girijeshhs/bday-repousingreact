import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeInOutScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(0deg);
  }
  20%, 80% {
    opacity: 0.8;
    transform: scale(1) rotate(var(--random-rotate-mid, 0deg));
  }
  100% {
    opacity: 0;
    transform: scale(0.5) rotate(var(--random-rotate-end, 0deg));
  }
`;

const ShapeWrapper = styled.div<{
  top: string;
  left: string;
  size: string;
  color: string;
  shapeType: 'circle' | 'square' | 'heart';
  animationDelay: string;
  animationDuration: string;
}>`
  position: fixed;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  opacity: 0;
  z-index: 3; /* Below messages, above background hearts */
  pointer-events: none;
  --random-rotate-mid: ${() => Math.random() * 40 - 20}deg;
  --random-rotate-end: ${() => Math.random() * 90 - 45}deg;
  animation: ${fadeInOutScale} ${props => props.animationDuration} ease-in-out ${props => props.animationDelay} forwards;

  ${props =>
    props.shapeType === 'circle' &&
    css`
      background-color: ${props.color};
      border-radius: 50%;
    `}

  ${props =>
    props.shapeType === 'square' &&
    css`
      background-color: ${props.color};
      border-radius: 3px; /* For a slightly softer pixel square */
    `}

  ${props => // CSS Heart
    props.shapeType === 'heart' &&
    css`
      background-color: ${props.color};
      transform: rotate(-45deg); // Initial rotation for heart shape
      animation-name: ${fadeInOutScale}; // Re-apply animation name due to transform
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: ${props.size};
        height: ${props.size};
        background-color: ${props.color};
        border-radius: 50%;
      }
      &::before {
        top: -${parseFloat(props.size) / 2}px;
        left: 0;
      }
      &::after {
        top: 0;
        left: -${parseFloat(props.size) / 2}px;
      }
    `}
`;

interface FloatingShapeData {
  id: number;
  top: string;
  left: string;
  size: string;
  color: string;
  shapeType: 'circle' | 'square' | 'heart';
  animationDelay: string;
  animationDuration: string;
}

const shapeColors = ["#ff7bac", "#ff85c1", "#ff99d6", "#e6e6fa", "#d8bfd8", "rgba(255, 192, 203, 0.7)"];
const shapeTypes: Array<'circle' | 'square' | 'heart'> = ['circle', 'square', 'heart'];

const FloatingShapes: React.FC = () => {
  const [shapes, setShapes] = useState<FloatingShapeData[]>([]);

  useEffect(() => {
    const createShape = () => {
      if (document.hidden) return;

      const randomSize = Math.random() * 25 + 15; // 15px to 40px
      const newShape: FloatingShapeData = {
        id: Date.now() + Math.random(),
        top: `${Math.random() * 80 + 10}%`, // Positioned somewhat centrally
        left: `${Math.random() * 80 + 10}%`,
        size: `${randomSize}px`,
        color: shapeColors[Math.floor(Math.random() * shapeColors.length)],
        shapeType: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        animationDelay: '0s',
        animationDuration: `${Math.random() * 1.5 + 2.5}s`, // Show for 2.5-4 seconds
      };

      setShapes(prev => [...prev, newShape]);

      setTimeout(() => {
        setShapes(prev => prev.filter(s => s.id !== newShape.id));
      }, (parseFloat(newShape.animationDuration) + 0.5) * 1000);
    };

    // Adjust interval for desired frequency
    const intervalId = setInterval(createShape, 1500 + Math.random() * 1500); // Every 1.5 to 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {shapes.map(shape => (
        <ShapeWrapper
          key={shape.id}
          top={shape.top}
          left={shape.left}
          size={shape.size}
          color={shape.color}
          shapeType={shape.shapeType}
          animationDelay={shape.animationDelay}
          animationDuration={shape.animationDuration}
        />
      ))}
    </>
  );
};

export default FloatingShapes;