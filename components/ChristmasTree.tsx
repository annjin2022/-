
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { MeshWobbleMaterial } from '@react-three/drei';

const EMERALD_GREEN = '#043927';
const GOLD_METAL = '#d4af37';

export const ChristmasTree: React.FC = () => {
  // Generate layers of the tree
  const treeLayers = useMemo(() => {
    return [
      { radius: 3, height: 2, pos: [0, 1, 0] },
      { radius: 2.5, height: 2, pos: [0, 2, 0] },
      { radius: 2, height: 1.8, pos: [0, 3, 0] },
      { radius: 1.5, height: 1.5, pos: [0, 4, 0] },
      { radius: 1, height: 1.2, pos: [0, 5, 0] },
    ];
  }, []);

  // Generate ornaments randomly
  const ornaments = useMemo(() => {
    const data = [];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const height = Math.random() * 5.5;
      const radiusAtHeight = 3 * (1 - height / 6.5);
      const r = radiusAtHeight * (0.8 + Math.random() * 0.2);
      
      data.push({
        position: [
          Math.cos(angle) * r,
          height + 0.5,
          Math.sin(angle) * r
        ] as [number, number, number],
        color: i % 4 === 0 ? '#ff0000' : GOLD_METAL,
        scale: 0.1 + Math.random() * 0.15,
        emissive: Math.random() > 0.7
      });
    }
    return data;
  }, []);

  return (
    <group>
      {/* Tree Trunk */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1, 16]} />
        <meshStandardMaterial color="#2d1d0d" roughness={0.9} />
      </mesh>

      {/* Foliage Layers */}
      {treeLayers.map((layer, idx) => (
        <mesh key={idx} position={layer.pos as any} castShadow receiveShadow>
          <coneGeometry args={[layer.radius, layer.height, 32]} />
          <meshStandardMaterial 
            color={EMERALD_GREEN} 
            roughness={0.6} 
            metalness={0.2} 
            flatShading={false}
          />
        </mesh>
      ))}

      {/* Star Topper */}
      <mesh position={[0, 5.8, 0]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial 
          color={GOLD_METAL} 
          emissive={GOLD_METAL} 
          emissiveIntensity={4} 
          metalness={1} 
          roughness={0.1} 
        />
      </mesh>

      {/* Ornaments */}
      {ornaments.map((orn, idx) => (
        <mesh key={idx} position={orn.position} castShadow>
          <sphereGeometry args={[orn.scale, 24, 24]} />
          <meshStandardMaterial 
            color={orn.color} 
            metalness={1} 
            roughness={0.1}
            emissive={orn.emissive ? orn.color : '#000'}
            emissiveIntensity={orn.emissive ? 2 : 0}
          />
        </mesh>
      ))}

      {/* Fairy Light String (Simplified as points) */}
      <group>
        {Array.from({ length: 60 }).map((_, i) => {
          const t = i / 60;
          const angle = t * Math.PI * 12;
          const height = t * 5.5;
          const radius = 3 * (1 - height / 6.5);
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, height + 0.5, Math.sin(angle) * radius]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#fffbe6" emissive="#fffbe6" emissiveIntensity={5} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};
