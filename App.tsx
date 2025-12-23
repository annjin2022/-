
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { UIOverlay } from './components/UIOverlay';
import { LoadingScreen } from './components/LoadingScreen';
import { GeminiChat } from './components/GeminiChat';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="relative w-full h-screen bg-[#011610] overflow-hidden select-none">
      {!isLoaded && <LoadingScreen />}
      
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [0, 5, 15], fov: 45 }}
          onCreated={() => setIsLoaded(true)}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <UIOverlay onOpenWishes={() => setShowChat(true)} />
      
      {showChat && (
        <GeminiChat onClose={() => setShowChat(false)} />
      )}

      {/* Elegant Frame/Vignette */}
      <div className="pointer-events-none absolute inset-0 z-10 border-[24px] border-[#011610]/30 mix-blend-multiply ring-inset ring-1 ring-[#d4af37]/20"></div>
    </div>
  );
};

export default App;
