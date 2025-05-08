import React from 'react';
import styled, { keyframes } from 'styled-components';

const fall = keyframes`
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
`;

const ConfettiPiece = styled.div<{ delay: number; duration: number; left: number; color: string; size: number }>`
  position: fixed;
  top: 0;
  left: ${props => props.left}%;
  width: ${props => props.size}px;
  height: ${props => props.size * 1.5}px; /* Rectangular confetti */
  background-color: ${props => props.color};
  opacity: 0;
  animation: ${fall} ${props => props.duration}s linear ${props => props.delay}s forwards;
  z-index: 100; /* Above everything */
  border-radius: 2px; /* Slight rounding for pixel feel */
`;

interface ConfettiEffectProps {
  isActive: boolean;
  count?: number;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ isActive, count = 50 }) => {
  if (!isActive) return null;

  const colors = ["#ff7bac", "#ffc0cb", "#e6e6fa", "#d8bfd8", "#ffd700"]; // Pinks, purples, gold
  const pieces = Array.from({ length: count }).map((_, i) => ({
    id: i,
    delay: Math.random() * 1, // Start falling within 1 second
    duration: Math.random() * 3 + 2, // Fall for 2-5 seconds
    left: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 6 + 4, // 4px to 10px
  }));

  return (
    <>
      {pieces.map(p => (
        <ConfettiPiece
          key={p.id}
          delay={p.delay}
          duration={p.duration}
          left={p.left}
          color={p.color}
          size={p.size}
        />
      ))}
    </>
  );
};

export default ConfettiEffect;