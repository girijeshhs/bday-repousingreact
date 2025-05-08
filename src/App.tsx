import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import DialogueBox from './components/DialogueBox';
import CharacterIcon from './components/CharacterIcon';
import Confetti from 'react-confetti';
// You'll create this component for your actual surprise:
// import SurpriseComponent from './components/SurpriseComponent';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #1a1a2e; // Fallback
    color: #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(-45deg, #232a44, #2f3c68, #3c4c88, #4a5aa0);
    background-size: 400% 400%;
    animation: ${gradientAnimation} 18s ease infinite;
    overflow-x: hidden; // Prevent horizontal scrollbar from gradient
  }

  * {
    box-sizing: border-box;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  text-align: center;
`;

const GridBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(#6b4c93 1px, transparent 1px),
    linear-gradient(90deg, #6b4c93 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.2;
  z-index: 1;
`;

const FloatingHeart = styled(FaHeart)`
  position: absolute;
  color: #e94560;
  animation: float 3s ease-in-out infinite;
  opacity: 0.6;
  z-index: 2;

  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
    100% { transform: translateY(0) rotate(360deg); }
  }
`;

const CharacterContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 3;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 800px;
  padding: 20px;
`;

const ProgressBarContainer = styled.div`
  width: 80%;
  max-width: 500px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin-bottom: 30px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #e94560;
  border-radius: 8px 0 0 8px;
  transition: width 0.5s ease-in-out;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProgressText = styled.span`
  padding-right: 5px;
  color: white;
  font-size: 0.8rem;
  font-family: 'Press Start 2P', cursive;
`;


// Placeholder for your actual surprise component
const SurprisePlaceholder = styled.div`
  padding: 30px 40px;
  background-color: rgba(42, 27, 61, 0.95);
  border: 4px solid #6b4c93;
  border-radius: 12px;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  box-shadow: 0 0 25px rgba(107, 76, 147, 0.5);
  animation: ${keyframes`
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  `} 0.7s ease-out;

  h2 {
    color: #ffcc00; // A celebratory gold
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  p {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

function App() {
  const [progress, setProgress] = useState(0);
  const [dialogueComplete, setDialogueComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDialogueProgress = (newProgress: number) => {
    setProgress(newProgress);
  };

  const handleDialogueComplete = () => {
    setDialogueComplete(true);
    setShowConfetti(true);
  };

  // Generate random floating hearts
  const hearts = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`
  }));

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <GridBackground />
        {hearts.map(heart => (
          <FloatingHeart
            key={heart.id}
            style={{
              left: heart.left,
              top: heart.top,
              animationDelay: heart.delay
            }}
          />
        ))}
        <CharacterContainer>
          <CharacterIcon position="left" />
          <CharacterIcon position="right" />
        </CharacterContainer>
        {!dialogueComplete ? (
          <>
            <ProgressBarContainer>
              <ProgressBarFill progress={progress}>
                {progress > 10 && <ProgressText>{Math.round(progress)}%</ProgressText>}
              </ProgressBarFill>
            </ProgressBarContainer>
            <ContentContainer>
              <DialogueBox
                onProgress={handleDialogueProgress}
                onComplete={handleDialogueComplete}
              />
            </ContentContainer>
          </>
        ) : (
          <SurprisePlaceholder>
            <h2>🎉 Hooray! 🎉</h2>
            <p>The dialogue is complete!</p>
            <p>This is where your amazing surprise content will appear.</p>
            <p>Consider adding a photo slideshow, a video, or a special interactive element here!</p>
            {/* Example: <YourSurpriseComponent /> */}
          </SurprisePlaceholder>
        )}
        {showConfetti && <Confetti />}
      </AppContainer>
    </>
  );
}

export default App;
