import styled from 'styled-components';

interface ProgressBarProps {
  progress: number;
}

const ProgressContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 600px;
  height: 20px;
  background-color: rgba(42, 27, 61, 0.9);
  border: 4px solid #6b4c93;
  border-radius: 10px;
  overflow: hidden;
  z-index: 3;
`;

const ProgressFill = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 100%;
  background-color: #e94560;
  transition: width 0.5s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressContainer>
      <ProgressFill width={progress} />
    </ProgressContainer>
  );
};

export default ProgressBar; 