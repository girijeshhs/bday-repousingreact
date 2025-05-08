import { useState } from 'react';
import styled from 'styled-components';

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

const DialogueBox: React.FC<DialogueBoxProps> = ({ onProgress, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleChoice = (nextStep: number) => {
    if (nextStep === -1) {
      onComplete();
    } else {
      setCurrentStep(nextStep);
      onProgress((nextStep / (dialogueSteps.length - 1)) * 100);
    }
  };

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