interface AIProps {
  onNavigate: (view: string) => void;
}

export const AI = ({ onNavigate }: AIProps) => {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div className="bg-[#141414] border-b border-[#252525] px-4 py-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="mb-3 text-gray-400 hover:text-[#00E676] font-bold text-sm flex items-center gap-2 transition-colors"
        >
          ← Volver al inicio
        </button>
        <h1 className="text-white font-black text-2xl mb-1">🤖 IA Coach</h1>
        <p className="text-gray-500 text-sm">Asistente inteligente para tus predicciones</p>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-[#141414] border border-[#252525] rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-white font-bold text-xl mb-2">IA Coach</h2>
          <p className="text-gray-400 text-sm mb-6">Próximamente disponible</p>
        </div>
      </div>
    </div>
  );
};
