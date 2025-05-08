import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const heartShower = keyframes`
  0% {
    transform: translateY(-10vh) rotate(0deg); // Start above screen
    opacity: 0.8;
  }
  100% {
    transform: translateY(110vh) rotate(30deg); // End below screen, with a slight rotation
    opacity: 0.3;
  }
`;

const HeartIcon = styled(FaHeart)<{
  left: string;
  animationDuration: string;
  animationDelay: string;
  size: string;
}>`
  position: fixed;
  top: 0; // Initial top position, animation handles the Y movement
  left: ${props => props.left};
  color: #ff7bac; // Pink color for hearts
  font-size: ${props => props.size};
  opacity: 0; // Start invisible, animation handles fade-in
  animation: ${heartShower} ${props => props.animationDuration} linear ${props => props.animationDelay} infinite;
  z-index: 1; // Ensure they are in the background
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
`;

interface HeartDetail {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  size: string;
}

const DecorativeElements: React.FC = () => {
  const [hearts, setHearts] = useState<HeartDetail[]>([]);
  const numHearts = 20; // Adjust number of hearts

  useEffect(() => {
    const newHearts: HeartDetail[] = [];
    for (let i = 0; i < numHearts; i++) {
      newHearts.push({
        id: i,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 5 + 8}s`, // Slower: 8 to 13 seconds duration
        animationDelay: `${Math.random() * 10}s`, // Staggered start times up to 10s
        size: `${Math.random() * 1 + 0.8}rem`, // Sizes between 0.8rem and 1.8rem
      });
    }
    setHearts(newHearts);
  }, []);

  return (
    <>
      {hearts.map(heart => (
        <HeartIcon
          key={heart.id}
          left={heart.left}
          animationDuration={heart.animationDuration}
          animationDelay={heart.animationDelay}
          size={heart.size}
        />
      ))}
    </>
  );
};

export default DecorativeElements;