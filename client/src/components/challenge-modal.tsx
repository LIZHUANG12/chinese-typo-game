import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/game-state';
import type { Challenge } from '@shared/schema';

interface ChallengeModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  timeLeft: number;
  selectedCharIndex: number;
  onClose: () => void;
  onSelectCharacter: (index: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function ChallengeModal({
  challenge,
  isOpen,
  timeLeft,
  selectedCharIndex,
  onClose,
  onSelectCharacter,
  onSubmit,
  isSubmitting
}: ChallengeModalProps) {
  if (!challenge) return null;

  const renderPassageText = () => {
    const text = challenge.passage;
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`
          cursor-pointer transition-all duration-200 rounded px-1 py-0.5 mx-0.5
          ${selectedCharIndex === index 
            ? 'bg-orange-500 text-white shadow-md' 
            : 'hover:bg-blue-100'
          }
        `}
        onClick={() => onSelectCharacter(index)}
      >
        {char}
      </span>
    ));
  };

  const getTimerColor = () => {
    if (timeLeft <= 10) return 'text-red-400';
    if (timeLeft <= 30) return 'text-yellow-400';
    return 'text-white';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full max-h-[90vh] overflow-hidden p-0">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 text-center">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-3">找出错别字挑战</DialogTitle>
          </DialogHeader>
          
          {/* Timer */}
          <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 inline-block">
            <span className="mr-2">⏰</span>
            <span className={`font-bold text-lg ${getTimerColor()}`}>{timeLeft}</span>秒
          </div>
          
          {/* Reward Amount */}
          <div className="mt-3 text-yellow-300">
            <span className="mr-2">💰</span>
            <span className="text-lg font-bold">+{formatCurrency(challenge.reward)}</span>
          </div>
        </div>

        {/* Challenge Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">阅读下面的文字，找出其中的错别字：</h3>
            <div className="bg-gray-50 p-4 rounded-lg leading-relaxed text-gray-800 text-base">
              {renderPassageText()}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">点击文字中的错别字进行选择</p>
            <div className="text-xs text-gray-500">
              💡 提示：仔细阅读，注意字词的正确写法
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 flex justify-between">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            放弃挑战
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={selectedCharIndex === -1 || isSubmitting}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isSubmitting ? '提交中...' : '提交答案'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
