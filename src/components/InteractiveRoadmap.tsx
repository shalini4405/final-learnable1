import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

interface RoadmapNode {
  id: number;
  x: number;
  y: number;
  title: string;
  status: 'locked' | 'available' | 'completed';
  type: 'milestone' | 'challenge' | 'quiz';
}

interface InteractiveRoadmapProps {
  nodes: RoadmapNode[];
  onNodeClick: (node: RoadmapNode) => void;
  currentProgress: number;
}

const InteractiveRoadmap: React.FC<InteractiveRoadmapProps> = ({
  nodes,
  onNodeClick,
  currentProgress,
}) => {
  const getNodeColor = (status: RoadmapNode['status']) => {
    switch (status) {
      case 'locked':
        return 'bg-gray-300';
      case 'available':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getNodeIcon = (type: RoadmapNode['type']) => {
    switch (type) {
      case 'milestone':
        return '🎯';
      case 'challenge':
        return '⚔️';
      case 'quiz':
        return '📝';
      default:
        return '📍';
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-pink-100 to-purple-100 rounded-xl overflow-hidden p-8">
      {/* Path connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node, index) => {
          if (index === nodes.length - 1) return null;
          const nextNode = nodes[index + 1];
          return (
            <path
              key={`path-${node.id}`}
              d={`M ${node.x} ${node.y} Q ${(node.x + nextNode.x) / 2} ${
                (node.y + nextNode.y) / 2 - 50
              } ${nextNode.x} ${nextNode.y}`}
              stroke={node.status === 'locked' ? '#CBD5E0' : '#3B82F6'}
              strokeWidth="4"
              fill="none"
              strokeDasharray={node.status === 'locked' ? '5,5' : 'none'}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{
            left: node.x,
            top: node.y,
            transform: 'translate(-50%, -50%)',
          }}
          whileHover={node.status !== 'locked' ? { scale: 1.1 } : {}}
          whileTap={node.status !== 'locked' ? { scale: 0.95 } : {}}
        >
          <button
            onClick={() => onNodeClick(node)}
            disabled={node.status === 'locked'}
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all',
              getNodeColor(node.status),
              node.status === 'locked' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            )}
          >
            <span className="text-2xl">{getNodeIcon(node.type)}</span>
          </button>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium">
            {node.title}
          </div>
        </motion.div>
      ))}

      {/* Progress indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white rounded-full h-2 w-full">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveRoadmap; 