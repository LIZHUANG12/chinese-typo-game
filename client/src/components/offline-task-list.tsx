import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/game-state';
import type { OfflineChallenge } from '@/data/offline-challenges';

interface OfflineTaskListProps {
  challenges: OfflineChallenge[];
  onStartChallenge: (challenge: OfflineChallenge) => void;
}

export function OfflineTaskList({ challenges, onStartChallenge }: OfflineTaskListProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'classical': return '📚';
      case 'modern': return '📖';
      case 'foreign': return '🌍';
      case 'poetry': return '📝';
      default: return '📚';
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(3 - difficulty);
  };

  return (
    <main className="p-4 space-y-4 pb-20">
      {challenges.map((challenge) => (
        <Card key={challenge.id} className="shadow-lg border-l-4 border-l-green-500 hover:shadow-xl transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 text-white rounded-lg p-2 text-lg">
                  {getCategoryIcon(challenge.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
                  <p className="text-sm text-gray-500">请在规定时间内完成</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-orange-500">
                  +{formatCurrency(challenge.reward)}
                </div>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm"
                  onClick={() => onStartChallenge(challenge)}
                >
                  领取挑战
                </Button>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>进度</span>
                <span>难度: {getDifficultyStars(challenge.difficulty)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}