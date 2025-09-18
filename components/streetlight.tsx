"use client"

import { RoundedBox } from "@react-three/drei"

interface StreetlightProps {
  position: [number, number, number]
}

export function Streetlight({ position }: StreetlightProps) {
  return (
    <group position={position}>
      {/* Pole */}
      <RoundedBox args={[0.1, 3, 0.1]} radius={0.02} position={[0, 1.5, 0]} castShadow>
        <meshStandardMaterial color="#374151" roughness={0.8} />
      </RoundedBox>

      {/* Light fixture */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <sphereGeometry args={[0.2, 8, 6]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fbbf24" emissiveIntensity={0.2} />
      </mesh>

      {/* Light source */}
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#fef3c7" distance={6} decay={2} />
    </group>
  )
}
