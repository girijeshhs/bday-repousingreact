import styled from 'styled-components';

interface CharacterIconProps {
  position: 'left' | 'right';
}

const IconContainer = styled.div<{ position: 'left' | 'right' }>`
  width: 80px;
  height: 80px;
  background-color: #e94560;
  border: 4px solid #fff;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  transform: ${props => props.position === 'left' ? 'scaleX(-1)' : 'none'};
  box-shadow: 0 0 20px rgba(233, 69, 96, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: ${props => props.position === 'left' ? 'scaleX(-1) scale(1.1)' : 'scale(1.1)'};
  }
`;

const PixelArt = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 2px;
  padding: 4px;
`;

const Pixel = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  border-radius: 2px;
`;

const CharacterIcon: React.FC<CharacterIconProps> = ({ position }) => {
  // Simple pixel art pattern for demonstration
  const pixelPattern = [
    ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
    ['#fff', '#e94560', '#e94560', '#e94560', '#e94560', '#e94560', '#e94560', '#fff'],
    ['#fff', '#e94560', '#fff', '#e94560', '#e94560', '#fff', '#e94560', '#fff'],
    ['#fff', '#e94560', '#e94560', '#e94560', '#e94560', '#e94560', '#e94560', '#fff'],
    ['#fff', '#e94560', '#e94560', '#e94560', '#e94560', '#e94560', '#e94560', '#fff'],
    ['#fff', '#e94560', '#fff', '#e94560', '#e94560', '#fff', '#e94560', '#fff'],
    ['#fff', '#e94560', '#e94560', '#e94560', '#e94560', '#e94560', '#e94560', '#fff'],
    ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
  ];

  return (
    <IconContainer position={position}>
      <PixelArt>
        {pixelPattern.map((row, i) =>
          row.map((color, j) => (
            <Pixel key={`${i}-${j}`} color={color} />
          ))
        )}
      </PixelArt>
    </IconContainer>
  );
};

export default CharacterIcon; 