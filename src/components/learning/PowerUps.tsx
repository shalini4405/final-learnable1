import React from 'react';
import { motion } from 'framer-motion';
import { PowerUp } from '@/types/learning';
import { Button } from '../ui/button';
import { Clock, Heart, Zap, SkipForward, HelpCircle, Timer, Scale } from 'lucide-react';

interface PowerUpsProps {
  availablePowerUps: PowerUp[];
  onUsePowerUp: (type: PowerUp['type']) => void;
}

const PowerUps: React.FC<PowerUpsProps> = ({ availablePowerUps, onUsePowerUp }) => {
  const getPowerUpIcon = (type: PowerUp['type']) => {
    switch (type) {
      case 'doublePoints':
        return <Scale className="w-6 h-6" />;
      case 'extraLife':
        return <Heart className="w-6 h-6" />;
      case 'timeFreeze':
        return <Clock className="w-6 h-6" />;
      case 'skipQuestion':
        return <SkipForward className="w-6 h-6" />;
      case 'fiftyFifty':
        return <Zap className="w-6 h-6" />;
      case 'hint':
        return <HelpCircle className="w-6 h-6" />;
      case 'extraTime':
        return <Timer className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getPowerUpLabel = (type: PowerUp['type']) => {
    switch (type) {
      case 'doublePoints':
        return 'Double Points';
      case 'extraLife':
        return 'Extra Life';
      case 'timeFreeze':
        return 'Time Freeze';
      case 'skipQuestion':
        return 'Skip Question';
      case 'fiftyFifty':
        return '50/50';
      case 'hint':
        return 'Hint';
      case 'extraTime':
        return 'Extra Time';
      default:
        return '';
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {availablePowerUps.map((powerUp) => (
        <motion.div
          key={powerUp.type}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            className={`relative ${powerUp.active ? 'bg-primary/20' : ''}`}
            onClick={() => onUsePowerUp(powerUp.type)}
            disabled={powerUp.active}
          >
            <div className="flex items-center gap-2">
              {getPowerUpIcon(powerUp.type)}
              <span className="text-sm">{getPowerUpLabel(powerUp.type)}</span>
            </div>
            {powerUp.duration && powerUp.active && (
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                {powerUp.duration}s
              </div>
            )}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default PowerUps; 