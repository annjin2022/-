
import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#011610] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-2 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mb-8"></div>
      <h2 className="text-[#d4af37] text-xl italic tracking-widest animate-pulse">Curating Excellence...</h2>
      <div className="absolute bottom-12 text-[#d4af37]/40 text-[10px] uppercase tracking-[0.5em]">
        Arix Signature Experience
      </div>
    </div>
  );
};
