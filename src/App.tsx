import { useState } from 'react'
import styled from 'styled-components'
import { FaHeart } from 'react-icons/fa'
import DialogueBox from './components/DialogueBox'
import CharacterIcon from './components/CharacterIcon'
import ProgressBar from './components/ProgressBar'
import Confetti from 'react-confetti'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #2a1b3d;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

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
`

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
`

const CharacterContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 3;
`

const ContentContainer = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 800px;
  padding: 20px;
`

function App() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [progress, setProgress] = useState(0)

  // Generate random floating hearts
  const hearts = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`
  }))

  return (
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
      <ContentContainer>
        <DialogueBox onProgress={setProgress} onComplete={() => setShowConfetti(true)} />
      </ContentContainer>
      <ProgressBar progress={progress} />
      {showConfetti && <Confetti />}
    </AppContainer>
  )
}

export default App
