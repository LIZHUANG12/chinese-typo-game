import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/game-state';

interface ResultModalProps {
  isOpen: boolean;
  isSuccess: boolean;
  reward: number;
  correctAnswer?: string;
  onClose: () => void;
}

export function ResultModal({ isOpen, isSuccess, reward, correctAnswer, onClose }: ResultModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full text-center p-8">
        {isSuccess ? (
          <div>
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">挑战成功！</h3>
            <p className="text-gray-600 mb-4">恭喜你找出了错别字</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="text-2xl font-bold text-green-600">+{formatCurrency(reward)}</div>
              <div className="text-sm text-green-600">红包已到账</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-red-600 mb-2">挑战失败</h3>
            <p className="text-gray-600 mb-4">很遗憾，没有找到正确答案</p>
            {correctAnswer && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="text-sm text-red-600">
                  正确答案：<span className="font-bold">{correctAnswer}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        <Button 
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
        >
          继续挑战
        </Button>
      </DialogContent>
    </Dialog>
  );
}
