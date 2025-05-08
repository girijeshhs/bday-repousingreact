import React from 'react';
import styled, { keyframes } from 'styled-components';

const subtleGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 3px #ff7bac, 0 0 5px #ff7bac, 0 0 7px #c865b3;
  }
  50% {
    text-shadow: 0 0 5px #ff7bac, 0 0 8px #ff7bac, 0 0 10px #e089c7;
  }
`;

const BannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%; /* Responsive width */
  max-width: 650px; /* Max width for very large screens */
  margin: 0 auto 25px auto; /* Centering and space below */
  padding: 8px 0;
  text-align: center;
  position: relative; /* Ensures z-index is effective */
  z-index: 1;        /* Stacks correctly within AppContainer (which is z-index: 10).
                       This makes TitleBanner part of the layer that is above FloatingMessages (z-index: 5). */
`;

const TitleContent = styled.h1`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.4rem; /* Adjust as needed */
  color: #ffffff; /* Bright white text */
  animation: ${subtleGlow} 3s infinite ease-in-out;
  margin: 0 10px; /* Space between text and hearts */
  line-height: 1.4; /* For multi-line text */

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 0 5px;
  }
`;

const PixelHeartDecorator = styled.span`
  font-family: 'Press Start 2P', cursive; /* Ensures heart matches font style if it's a text char */
  color: #ff7bac; /* Pink heart */
  font-size: 1.6rem; /* Adjust size relative to title */
  text-shadow: 1px 1px 0px #4a0072; /* Dark purple pixel shadow */

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

interface TitleBannerProps {
  name: string; // Your girlfriend's name
}

const TitleBanner: React.FC<TitleBannerProps> = ({ name }) => {
  return (
    <BannerWrapper>
      <PixelHeartDecorator>💖</PixelHeartDecorator>
      <TitleContent>
        Happy Birthday {name},<br />& our First Anniversary!
      </TitleContent>
      <PixelHeartDecorator>💖</PixelHeartDecorator>
    </BannerWrapper>
  );
};

export default TitleBanner;