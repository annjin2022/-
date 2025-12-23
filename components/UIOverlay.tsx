
import React from 'react';

interface Props {
  onOpenWishes: () => void;
}

export const UIOverlay: React.FC<Props> = ({ onOpenWishes }) => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 pointer-events-none">
      {/* Top Section */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col">
          <span className="text-sm tracking-[0.4em] uppercase opacity-60">Signature Collection</span>
          <h1 className="text-5xl font-bold italic tracking-tight text-[#d4af37]">Arix</h1>
        </div>
        
        <div className="text-right flex flex-col gap-1 opacity-70">
          <span className="text-xs uppercase tracking-widest">Est. 2024</span>
          <span className="text-xs uppercase tracking-widest">Digital Atelier</span>
        </div>
      </div>

      {/* Middle Section - Aesthetic text */}
      <div className="absolute top-1/2 left-12 -translate-y-1/2 w-48 opacity-40 hidden md:block">
        <p className="text-xs leading-relaxed uppercase tracking-widest">
          A fusion of timeless elegance and procedural craftsmanship. 
          Experience the golden hour of the digital holiday.
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-end pointer-events-auto gap-8">
        <div className="max-w-md">
          <h2 className="text-2xl mb-4 italic">Unwrap the Extraordinary</h2>
          <p className="text-sm opacity-80 leading-relaxed font-light">
            Each ornament is a testament to the Arix legacy. Intertwining emerald depth with the radiance of pure gold.
          </p>
        </div>

        <button 
          onClick={onOpenWishes}
          className="group relative px-10 py-5 overflow-hidden transition-all bg-[#d4af37] text-[#011610] font-semibold tracking-widest uppercase text-xs"
        >
          <span className="relative z-10">Make a Wish</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </div>
  );
};
