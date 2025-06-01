import { formatCurrency } from '@/lib/game-state';

interface HeaderProps {
  totalEarnings: number;
  completedTasks: number;
  accuracy: number;
}

export function Header({ totalEarnings, completedTasks, accuracy }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-4 left-8 w-12 h-8 bg-yellow-400 rounded-full opacity-80"></div>
      <div className="absolute top-6 right-12 w-8 h-6 bg-yellow-300 rounded-full opacity-60"></div>
      <div className="absolute bottom-4 right-8 w-10 h-6 bg-yellow-400 rounded-full opacity-70"></div>
      
      <div className="relative z-10 text-center">
        <h1 className="text-2xl font-bold mb-2">居家录入</h1>
        <div className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full inline-block font-semibold text-sm">
          请在规定时间内输入无误秒到！
        </div>
        
        {/* Stats Bar */}
        <div className="mt-4 flex justify-around text-center">
          <div>
            <div className="text-xl font-bold">{formatCurrency(totalEarnings)}</div>
            <div className="text-xs opacity-90">累计收益</div>
          </div>
          <div>
            <div className="text-xl font-bold">{completedTasks}</div>
            <div className="text-xs opacity-90">完成任务</div>
          </div>
          <div>
            <div className="text-xl font-bold">{accuracy}%</div>
            <div className="text-xs opacity-90">准确率</div>
          </div>
        </div>
      </div>
    </header>
  );
}
