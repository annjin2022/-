
import React, { useState } from 'react';
import { processWish } from '../services/geminiService';
import { WishResponse } from '../types';

interface Props {
  onClose: () => void;
}

export const GeminiChat: React.FC<Props> = ({ onClose }) => {
  const [wish, setWish] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<WishResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;
    
    setLoading(true);
    const result = await processWish(wish);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-40 bg-[#011610]/95 backdrop-blur-md flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#043927] border border-[#d4af37]/30 p-8 md:p-12 relative overflow-hidden">
        {/* Aesthetic Background Detail */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#d4af37] hover:scale-110 transition-transform"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!response ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl italic text-[#d4af37] mb-2">The Wish Atelier</h2>
              <p className="text-sm tracking-widest uppercase opacity-60">Whisper your desire to the Arix spirit</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="What does your heart desire this season?"
                className="w-full h-32 bg-[#011610] border border-[#d4af37]/20 p-4 text-[#d4af37] placeholder-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] transition-colors resize-none italic"
              />
              
              <button
                type="submit"
                disabled={loading || !wish.trim()}
                className="w-full py-4 bg-[#d4af37] text-[#011610] font-bold uppercase tracking-widest disabled:opacity-50 transition-opacity"
              >
                {loading ? "Communing..." : "Send to the Stars"}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-4">
              <h2 className="text-3xl italic text-[#d4af37]">Manifestation Complete</h2>
              <div className="h-px w-24 bg-[#d4af37]/30 mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#011610]/40 p-6 rounded-sm border-l-2 border-[#d4af37]">
                <p className="italic text-lg leading-relaxed text-[#d4af37]/90">{response.message}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#d4af37]/50 font-bold">Your Eternal Ornament</span>
                  <p className="text-xs leading-relaxed opacity-80">{response.ornamentDescription}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#d4af37]/50 font-bold">Arix Recommendation</span>
                  <p className="text-xs leading-relaxed opacity-80">{response.giftIdea}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => { setResponse(null); setWish(''); }}
              className="w-full py-4 border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors uppercase tracking-widest text-xs"
            >
              Make Another Wish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
