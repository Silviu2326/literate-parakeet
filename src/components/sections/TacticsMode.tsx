interface TacticsModeProps {
  onNavigate: (view: string) => void;
}

export const TacticsMode = ({ onNavigate }: TacticsModeProps) => {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <div className="bg-[#141414] border-b border-[#252525] px-4 py-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="mb-3 text-gray-400 hover:text-[#00E676] font-bold text-sm flex items-center gap-2 transition-colors"
        >
          ← Volver al inicio
        </button>
        <h1 className="text-white font-black text-2xl mb-1">Modo DT</h1>
        <p className="text-gray-500 text-sm">Estrategia y táctica en tiempo real</p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-[#141414] border border-[#252525] rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-white font-black text-2xl mb-2">Modo Director Técnico</h2>
            <p className="text-gray-400 mb-6">
              Toma decisiones tácticas en tiempo real durante los partidos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0D0D0D] border border-[#252525] rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-white font-bold text-sm mb-1">Cambios Tácticos</h3>
              <p className="text-gray-500 text-xs">Modifica formación durante el partido</p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#252525] rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-sm mb-1">Sustituciones</h3>
              <p className="text-gray-500 text-xs">Realiza cambios estratégicos</p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#252525] rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="text-white font-bold text-sm mb-1">Análisis Live</h3>
              <p className="text-gray-500 text-xs">Estadísticas en tiempo real</p>
            </div>
          </div>

          <div className="inline-block bg-[#00E676]/10 border border-[#00E676]/30 rounded-xl px-6 py-3 mx-auto">
            <span className="text-[#00E676] font-bold">Próximamente disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
};
