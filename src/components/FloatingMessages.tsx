import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInOutDrift = keyframes`
  0% {
    opacity: 0;
    transform: translateY(15px) scale(0.9);
  }
  20% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  80% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-15px) scale(0.9);
  }
`;

const MessageWrapper = styled.div<{
  top: string;
  left: string;
  delay: string;
  duration: string;
}>`
  position: fixed;
  top: ${props => props.top};
  left: ${props => props.left};
  
  /* New Attractive Design */
  background-color: #ff7bac; /* Vibrant pink background */
  color: white; /* White text for contrast */
  font-family: 'Press Start 2P', cursive;
  font-size: 0.75rem; 
  padding: 10px 18px; 
  border-radius: 8px; /* Clean rounded corners */
  min-width: 100px; 
  text-align: center;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.25); /* Slightly more pronounced shadow */
  border: 2px solid #4a0072; /* Dark purple border for definition */
  
  z-index: 5; /* Ensure it's above background hearts, below main UI */
  opacity: 0;
  animation: ${fadeInOutDrift} ${props => props.duration} ease-in-out ${props => props.delay} forwards;
  pointer-events: none; 
  white-space: nowrap;
  
  /* Removed cloud-specific ::before and ::after pseudo-elements */
`;

interface FloatingMessageData {
  id: number;
  text: string;
  top: string;
  left: string;
  delay: string;
  duration: string;
}

const allMessages = [ 
  "hello cutie 😘",
  "i love u ❤️",
  "You're amazing!",
  "My favorite! ✨",
  "So happy together!",
  "My sunshine ☀️",
  "Best person ever!",
  "Thinking of you!",
  "Hugs & Kisses 🤗💋",
  "Forever yours <3"
];

// Define the central "forbidden" zone (percentages of viewport)
const FORBIDDEN_ZONE = {
  TOP_BOUNDARY: 20,    
  BOTTOM_BOUNDARY: 80, 
  LEFT_BOUNDARY: 15,   
  RIGHT_BOUNDARY: 85   
};

// Approximate message box dimensions as percentage of viewport for rough check
const APPROX_BOX_HEIGHT_VH = 8; 
const APPROX_BOX_WIDTH_VW = 18;  // Adjusted for potentially longer messages

const FloatingMessages: React.FC = () => {
  const [messages, setMessages] = useState<FloatingMessageData[]>([]);

  useEffect(() => {
    const createMessage = () => {
      if (document.hidden) return; 

      const randomText = allMessages[Math.floor(Math.random() * allMessages.length)];
      
      let topPosPercent: number, leftPosPercent: number;
      let attempts = 0;
      const MAX_POSITION_ATTEMPTS = 10;

      do {
        const edgeZone = Math.floor(Math.random() * 4); 

        switch (edgeZone) {
          case 0: // Top edge
            topPosPercent = Math.random() * (FORBIDDEN_ZONE.TOP_BOUNDARY - APPROX_BOX_HEIGHT_VH);
            leftPosPercent = Math.random() * (100 - APPROX_BOX_WIDTH_VW);
            break;
          case 1: // Bottom edge
            topPosPercent = FORBIDDEN_ZONE.BOTTOM_BOUNDARY + Math.random() * (100 - FORBIDDEN_ZONE.BOTTOM_BOUNDARY - APPROX_BOX_HEIGHT_VH);
            leftPosPercent = Math.random() * (100 - APPROX_BOX_WIDTH_VW);
            break;
          case 2: // Left edge
            topPosPercent = Math.random() * (100 - APPROX_BOX_HEIGHT_VH);
            leftPosPercent = Math.random() * (FORBIDDEN_ZONE.LEFT_BOUNDARY - APPROX_BOX_WIDTH_VW);
            break;
          case 3: // Right edge
          default:
            topPosPercent = Math.random() * (100 - APPROX_BOX_HEIGHT_VH);
            leftPosPercent = FORBIDDEN_ZONE.RIGHT_BOUNDARY + Math.random() * (100 - FORBIDDEN_ZONE.RIGHT_BOUNDARY - APPROX_BOX_WIDTH_VW);
            break;
        }
        
        attempts++;
        if (attempts >= MAX_POSITION_ATTEMPTS) break; 

      } while (false); 

      const finalTop = Math.max(0, Math.min(topPosPercent, 100 - APPROX_BOX_HEIGHT_VH - 2));
      const finalLeft = Math.max(0, Math.min(leftPosPercent, 100 - APPROX_BOX_WIDTH_VW - 2));

      const newMessage: FloatingMessageData = {
        id: Date.now() + Math.random(),
        text: randomText,
        top: `${finalTop}%`, 
        left: `${finalLeft}%`, 
        delay: '0s',
        duration: `${Math.random() * 1.5 + 2}s`, // Message visible for 2 to 3.5 seconds
      };

      setMessages(prev => [...prev, newMessage]);

      // Remove message after its animation duration + a small buffer
      setTimeout(() => {
        setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
      }, (parseFloat(newMessage.duration) + 0.3) * 1000); // Reduced buffer slightly
    };

    // Make messages appear more frequently
    // Old: const intervalId = setInterval(createMessage, 2800 + Math.random() * 2000); // Every 2.8-4.8 seconds
    const intervalId = setInterval(createMessage, 1200 + Math.random() * 1000); // New: Every 1.2 to 2.2 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {messages.map(msg => (
        <MessageWrapper
          key={msg.id}
          top={msg.top}
          left={msg.left}
          delay={msg.delay}
          duration={msg.duration}
        >
          {msg.text}
        </MessageWrapper>
      ))}
    </>
  );
};

export default FloatingMessages;