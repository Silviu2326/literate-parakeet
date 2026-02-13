import type { Bet } from '../../types/index.ts';

interface BetCardProps {
  bet: Bet;
}

export const BetCard = ({ bet }: BetCardProps) => {
  const getStatusLabel = () => {
    switch (bet.status) {
      case 'won': return '✅ GANADA';
      case 'lost': return '❌ PERDIDA';
      default: return '⏳ PENDIENTE';
    }
  };

  const getStatusColor = () => {
    switch (bet.status) {
      case 'won': return 'border-l-[#00E676]';
      case 'lost': return 'border-l-[#F44336]';
      default: return 'border-l-[#FFD700]';
    }
  };

  const potential = (bet.amount * bet.odds).toFixed(2);
  const profit = (parseFloat(potential) - bet.amount).toFixed(2);

  return (
    <div className={`bg-[#141414] border border-[#252525] border-l-4 ${getStatusColor()} rounded-2xl p-4 mb-3`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-white font-bold text-sm mb-1">{bet.match}</div>
          <div className="text-gray-500 text-xs">{bet.typeName || bet.type} · {bet.date}</div>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
          bet.status === 'won' ? 'bg-[#00E676]/20 text-[#00E676]' :
          bet.status === 'lost' ? 'bg-[#F44336]/20 text-[#F44336]' :
          'bg-[#FFD700]/20 text-[#FFD700]'
        }`}>
          {getStatusLabel()}
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-bold text-sm">{bet.pick}</span>
        <span className="text-[#00E676] font-bold text-sm">×{bet.odds.toFixed(2)}</span>
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">Apuesta: <span className="text-white font-bold">€{bet.amount}</span></span>
        {bet.status === 'won' && (
          <span className="text-[#00E676] font-bold">+€{profit} ✓</span>
        )}
        {bet.status === 'lost' && (
          <span className="text-[#F44336] font-bold">-€{bet.amount}</span>
        )}
        {bet.status === 'pending' && (
          <span className="text-[#FFD700] font-bold">→ €{potential}</span>
        )}
      </div>
    </div>
  );
};
