import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface DialogueStep {
  text: string;
  choices: {
    text: string;
    nextStep: number;
  }[];
}

interface DialogueBoxProps {
  onProgress: (progress: number) => void;
  onComplete: () => void;
}

const dialogueSteps: DialogueStep[] = [
  {
    text: "Happy Anniversary! Today marks another beautiful year of our journey together. Shall we reminisce about our special moments?",
    choices: [
      { text: "Yes, let's take a trip down memory lane!", nextStep: 1 },
      { text: "I'd love to see our favorite memories!", nextStep: 1 }
    ]
  },
  {
    text: "Remember our first date? The butterflies, the nervous smiles, and the magical connection we felt...",
    choices: [
      { text: "It was the beginning of something beautiful", nextStep: 2 },
      { text: "I knew you were special from that moment", nextStep: 2 }
    ]
  },
  {
    text: "Through all the ups and downs, we've grown stronger together. Every challenge has only brought us closer.",
    choices: [
      { text: "Our love has only grown stronger", nextStep: 3 },
      { text: "We make a great team", nextStep: 3 }
    ]
  },
  {
    text: "Remember that time we stayed up all night just talking and watching the stars?",
    choices: [
      { text: "One of my favorite memories", nextStep: 4 },
      { text: "We should do that again soon!", nextStep: 4 }
    ]
  },
  {
    text: "What about our first trip together? Getting lost but finding the most amazing views...",
    choices: [
      { text: "It was perfectly imperfect", nextStep: 5 },
      { text: "We've been adventurous from the start", nextStep: 5 }
    ]
  },
  {
    text: "Remember when we cooked that disastrous meal together but ended up laughing so hard?",
    choices: [
      { text: "We've had our share of kitchen fails!", nextStep: 6 },
      { text: "Our laughter made it perfect anyway", nextStep: 6 }
    ]
  },
  {
    text: "You've always known how to make me smile, even on my worst days.",
    choices: [
      { text: "Your happiness means everything to me", nextStep: 7 },
      { text: "That's what partners are for", nextStep: 7 }
    ]
  },
  {
    text: "I cherish how we can sit in comfortable silence, just enjoying each other's presence.",
    choices: [
      { text: "Those quiet moments are special", nextStep: 8 },
      { text: "Just being with you feels like home", nextStep: 8 }
    ]
  },
  {
    text: "What's your favorite memory of us so far?",
    choices: [
      { text: "Every moment with you is my favorite", nextStep: 9 },
      { text: "There are too many to choose just one", nextStep: 9 }
    ]
  },
  {
    text: "If we could go anywhere in the world together right now, where would you want to go?",
    choices: [
      { text: "Somewhere we could see the northern lights", nextStep: 10 },
      { text: "A quiet beach where it's just us", nextStep: 10 }
    ]
  },
  {
    text: "What's one thing you'd like us to learn or try together this year?",
    choices: [
      { text: "Let's learn to dance together", nextStep: 11 },
      { text: "I want us to try cooking new cuisines", nextStep: 11 }
    ]
  },
  {
    text: "I've prepared a small surprise for you today...",
    choices: [
      { text: "I can't wait to see it!", nextStep: 12 },
      { text: "You always know how to surprise me", nextStep: 12 }
    ]
  },
  {
    text: "But before that, I want you to know how much you mean to me. Your love has changed my life in the most beautiful ways.",
    choices: [
      { text: "You've changed my life too", nextStep: 13 },
      { text: "I feel the same way about you", nextStep: 13 }
    ]
  },
  {
    text: "Every day with you feels like a gift, and I'm looking forward to creating many more memories together.",
    choices: [
      { text: "Our story is just beginning", nextStep: 14 },
      { text: "I can't wait for our future", nextStep: 14 }
    ]
  },
  {
    text: "Here's to many more years of love, laughter, and beautiful memories together. I love you more than words can express!",
    choices: [
      { text: "I love you too!", nextStep: -1 },
      { text: "Forever and always!", nextStep: -1 }
    ]
  }
];

const DialogueContainer = styled.div`
  background-color: rgba(42, 27, 61, 0.9);
  border: 4px solid #6b4c93;
  border-radius: 8px;
  padding: 20px;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  box-shadow: 0 0 20px rgba(107, 76, 147, 0.3);
`;

const DialogueText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const ChoiceButton = styled.button`
  background-color: #e94560;
  color: white;
  border: none;
  padding: 12px 24px;
  margin: 8px;
  border-radius: 4px;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background-color: #d13b54;
    transform: scale(1.05);
    border-color: #fff;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const CelebrationContainer = styled.div`
  animation: ${fadeIn} 1s ease-in;
  text-align: center;
  padding: 2rem;
`;

const CelebrationTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #e94560;
`;

const CelebrationText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ContinueButton = styled(ChoiceButton)`
  background-color: #6b4c93;
  &:hover {
    background-color: #523775;
  }
`;

const DialogueBox: React.FC<DialogueBoxProps> = ({ onProgress, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleChoice = (nextStep: number) => {
    if (nextStep === -1) {
      setIsFinished(true);
      onProgress(100);
    } else {
      setCurrentStep(nextStep);
      onProgress((nextStep / (dialogueSteps.length - 1)) * 100);
    }
  };

  const handleComplete = () => {
    setIsFinished(false);
    onComplete();
  };

  if (isFinished) {
    return (
      <DialogueContainer>
        <CelebrationContainer>
          <CelebrationTitle>Happy Anniversary!</CelebrationTitle>
          <CelebrationText>
            Thank you for this wonderful journey together. I've prepared something 
            special for you - click below to see it!
          </CelebrationText>
          <ContinueButton onClick={handleComplete}>
            See My Surprise ❤️
          </ContinueButton>
        </CelebrationContainer>
      </DialogueContainer>
    );
  }

  return (
    <DialogueContainer>
      <DialogueText>{dialogueSteps[currentStep].text}</DialogueText>
      <ButtonContainer>
        {dialogueSteps[currentStep].choices.map((choice, index) => (
          <ChoiceButton
            key={index}
            onClick={() => handleChoice(choice.nextStep)}
          >
            {choice.text}
          </ChoiceButton>
        ))}
      </ButtonContainer>
    </DialogueContainer>
  );
};

export default DialogueBox;