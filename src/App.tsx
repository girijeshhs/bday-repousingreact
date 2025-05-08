import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import DialogueBox from './components/DialogueBox';
import DecorativeElements from './components/DecorativeElements'; // Your floating hearts (react-icons)
import FloatingMessages from './components/FloatingMessages';   // RE-ENABLING: Your floating text messages
// import FloatingShapes from './components/FloatingShapes';   // REMOVED: The floating CSS shapes
import ConfettiEffect from './components/ConfettiEffect';   // Assuming you have this for later
import TitleBanner from './components/TitleBanner'; // Import the new banner

// Keep gradientAnimation for potential subtle movement if desired, or remove if too busy
const gradientAnimation = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 10% 10%; } /* Subtle shift */
  100% { background-position: 0% 0%; }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Krub', sans-serif;
    /* Purple Grid Background */
    --grid-color: rgba(255, 255, 255, 0.07); /* Lighter lines for subtlety */
    --grid-size: 25px; /* Adjust for desired grid density */
    --base-purple: #4a0072; /* Darker purple base like the image */

    background-color: var(--base-purple);
    background-image:
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
    background-size: var(--grid-size) var(--grid-size);
    
    color: #e0e0e0; /* Default text color, adjust as needed */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden; /* Important to prevent scrollbars from off-screen elements */
  }

  * {
    box-sizing: border-box;
  }
`;

// Minor tweak to AppContainer if needed for z-indexing with the new body::before
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 10; /* Ensure dialogue box is above floating elements */
`;

const ProgressBarContainer = styled.div`
  width: 80%;
  max-width: 500px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.15); /* Slightly more opaque for visibility */
  border-radius: 10px;
  margin-bottom: 30px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #ff7bac; /* Pink to match hearts */
  border-radius: 8px 0 0 8px;
  transition: width 0.5s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProgressText = styled.span`
  padding-right: 5px;
  color: white;
  font-size: 0.8rem;
  font-family: 'Press Start 2P', cursive; /* Keeping this for the retro touch here */
`;

const SurprisePlaceholder = styled.div`
  padding: 30px 40px;
  background-color: rgba(255, 240, 245, 0.9); /* LavenderBlush background */
  border: 3px solid #ff7bac; /* Pink border */
  border-radius: 12px;
  color: #333; /* Darker text for readability on light background */
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  box-shadow: 0 0 20px rgba(255, 123, 172, 0.4); /* Pink shadow */
  animation: ${keyframes`
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  `} 0.7s ease-out;

  h2 {
    color: #ff69b4; /* Hot Pink title */
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
  const [showConfetti, setShowConfetti] = useState(false); // For confetti effect

  const handleDialogueProgress = (newProgress: number) => {
    setProgress(newProgress);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); 
  };

  const handleDialogueComplete = () => {
    setDialogueComplete(true);
    triggerConfetti(); // Example: trigger confetti on completion
  };

  const yourGirlfriendsName = "Emma"; // <<< REPLACE 'Emma' WITH THE ACTUAL NAME

  return (
    <>
      <GlobalStyle />
      <DecorativeElements /> {/* Your floating react-icon hearts */}
      <FloatingMessages />   {/* RE-ENABLING: Your floating text messages */}
      {/* <FloatingShapes /> */}     {/* REMOVED: Your floating CSS shapes */}
      <ConfettiEffect isActive={showConfetti} style={{ zIndex: 100 }} />

      <AppContainer>
        {!dialogueComplete ? (
          <>
            <TitleBanner name={yourGirlfriendsName} /> {/* Banner added here */}
            <ProgressBarContainer>
              <ProgressBarFill progress={progress}>
                {progress > 10 && <ProgressText>{Math.round(progress)}%</ProgressText>}
              </ProgressBarFill>
            </ProgressBarContainer>
            <DialogueBox
              onProgress={handleDialogueProgress}
              onComplete={handleDialogueComplete}
            />
          </>
        ) : (
          <>
            <TitleBanner name={yourGirlfriendsName} /> {/* Also show on completion screen */}
            <SurprisePlaceholder>
              <h2>💖 Yay! 💖</h2>
              <p>You've reached the end!</p>
              <p>Time for your special surprise...</p>
            </SurprisePlaceholder>
          </>
        )}
      </AppContainer>
    </>
  );
}

export default App;
