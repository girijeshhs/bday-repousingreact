import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Assume you have pixel art icons (gift.png, photo_icon.png, music_note.png)
// in your public folder.

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const IconContainer = styled.div<{ top: string; left?: string; right?: string; }>`
  position: fixed;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 10; // Above most things
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.2s ease-out;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const SparkleEffect = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #ffd700; /* Gold sparkle */
  border-radius: 50%;
  opacity: 0;
  animation: ${sparkleAnimation} 0.5s ease-out;
  /* More sparkles can be added with pseudo-elements or more divs */
`;

const MessagePopup = styled.div`
  position: absolute;
  bottom: 110%; /* Above the icon */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 192, 203, 0.95); /* Pink */
  color: #4a0072; /* Purple */
  padding: 5px 10px;
  border-radius: 5px;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.6rem;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;

  &.visible {
    opacity: 1;
  }
`;

interface InteractiveIconProps {
  iconUrl: string;
  altText: string;
  message: string;
  top: string;
  left?: string;
  right?: string;
}

const InteractiveIcon: React.FC<InteractiveIconProps> = ({ iconUrl, altText, message, top, left, right }) => {
  const [showSparkle, setShowSparkle] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowSparkle(true);
    setShowPopup(true);
    setTimeout(() => setShowSparkle(false), 500);
    setTimeout(() => setShowPopup(false), 2000); // Popup visible for 2s
  };

  return (
    <IconContainer top={top} left={left} right={right} onClick={handleClick}>
      <img src={iconUrl} alt={altText} />
      {showSparkle && <SparkleEffect style={{ top: `${Math.random()*50-25}%`, left: `${Math.random()*50-25}%` }} />}
      {showSparkle && <SparkleEffect style={{ top: `${Math.random()*60-30}%`, left: `${Math.random()*60-30}%`, animationDelay: '0.1s' }} />}
      <MessagePopup className={showPopup ? 'visible' : ''}>{message}</MessagePopup>
    </IconContainer>
  );
};

export default InteractiveIcon;