import styled, { keyframes } from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const float = keyframes`
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.1); }
  100% { transform: translateY(0) scale(1); }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
`;

const FloatingHeart = styled(FaHeart)<{
  left: string;
  top: string;
  size: string;
  delay: string;
}>`
  position: absolute;
  color: #ff7bac; /* Changed to a vibrant pink */
  opacity: 0.7;
  left: ${props => props.left};
  top: ${props => props.top};
  font-size: ${props => props.size};
  animation: ${float} 3.5s ease-in-out infinite;
  animation-delay: ${props => props.delay};
  filter: drop-shadow(0 2px 8px rgba(100, 80, 200, 0.18));
`;

const DecorativeElements = () => {
  // Increase the number of floating hearts
  const hearts = Array.from({ length: 30 }, (_, i) => ({ // Changed from 10 to 30
    id: i,
    left: `${Math.random() * 90 + 2}%`,
    top: `${Math.random() * 80 + 5}%`,
    size: `${Math.random() * 18 + 18}px`, // You can also adjust size range if needed
    delay: `${Math.random() * 3}s`, // Slightly increased max delay for more variation
  }));

  return (
    <Container>
      {hearts.map(heart => (
        <FloatingHeart
          key={heart.id}
          left={heart.left}
          top={heart.top}
          size={heart.size}
          delay={heart.delay}
        />
      ))}
    </Container>
  );
};

export default DecorativeElements;