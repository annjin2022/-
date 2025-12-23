
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Environment, 
  Float, 
  Stars,
  Sparkles,
  ContactShadows
} from '@react-three/drei';
import { Bloom, EffectComposer, Vignette, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ChristmasTree } from './ChristmasTree';

export const Scene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 4, 12]} fov={35} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minPolarAngle={Math.PI / 4} 
        maxPolarAngle={Math.PI / 2} 
        minDistance={8}
        maxDistance={20}
      />

      {/* Lighting Architecture */}
      <ambientLight intensity={0.2} />
      <spotLight 
        position={[10, 20, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        color="#ffd700" 
      />
      <pointLight position={[-10, 5, -5]} intensity={1} color="#043927" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#ffd700" />

      {/* Atmosphere */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={10} size={1} speed={0.4} opacity={0.5} color="#ffd700" />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={groupRef} position={[0, -2, 0]}>
          <ChristmasTree />
        </group>
      </Float>

      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.45} far={10} color="#011610" />

      {/* Luxury Post-Processing */}
      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={1.1} 
          mipmapBlur 
          intensity={1.5} 
          radius={0.4} 
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <Noise opacity={0.05} />
      </EffectComposer>

      <Environment preset="city" />
      <fog attach="fog" args={['#011610', 10, 25]} />
    </>
  );
};
