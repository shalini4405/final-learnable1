import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Rotate3D } from 'lucide-react';

interface FlashCardProps {
  cards: Array<{
    id: number;
    question: string;
    answer: string;
    category: string;
  }>;
}

const FlashCard: React.FC<FlashCardProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnown = () => {
    if (!knownCards.includes(currentIndex)) {
      setKnownCards([...knownCards, currentIndex]);
    }
    handleNext();
  };

  const currentCard = cards[currentIndex];
  const progress = (knownCards.length / cards.length) * 100;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-sm font-medium text-gray-500">
        Card {currentIndex + 1} of {cards.length} • {currentCard.category}
      </div>

      <div className="relative w-[400px] h-[250px] perspective-1000">
        <motion.div
          className="w-full h-full relative preserve-3d cursor-pointer"
          onClick={handleFlip}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Front of card */}
          <Card className="absolute w-full h-full backface-hidden bg-white p-6 flex flex-col items-center justify-center">
            <p className="text-xl font-medium text-center">{currentCard.question}</p>
            <Rotate3D className="absolute bottom-4 right-4 text-gray-400 h-5 w-5" />
          </Card>

          {/* Back of card */}
          <Card className="absolute w-full h-full backface-hidden bg-white p-6 flex flex-col items-center justify-center rotate-y-180">
            <p className="text-xl font-medium text-center">{currentCard.answer}</p>
            <Rotate3D className="absolute bottom-4 right-4 text-gray-400 h-5 w-5" />
          </Card>
        </motion.div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={handlePrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="default" 
          className="bg-green-500 hover:bg-green-600"
          onClick={handleKnown}
        >
          I Know This
        </Button>
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default FlashCard; 