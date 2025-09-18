"use client"

import { useRef } from "react"
import type { Mesh } from "three"
import { RoundedBox } from "@react-three/drei"

interface HouseProps {
  position: [number, number, number]
  isLit: boolean
  scale?: number
}

export function House({ position, isLit, scale = 1 }: HouseProps) {
  const houseRef = useRef<Mesh>(null)

  return (
    <group position={position} scale={scale}>
      {/* Main house body - rounded for clay-like appearance */}
      <RoundedBox args={[2, 2.5, 2]} radius={0.1} smoothness={2} position={[0, 1.25, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={isLit ? "#fef3c7" : "#64748b"} roughness={0.8} metalness={0.1} />
      </RoundedBox>

      {/* Roof - pyramid shape with rounded edges */}
      <mesh position={[0, 3.1, 0]} castShadow>
        <coneGeometry args={[1.8, 1.2, 4]} />
        <meshStandardMaterial
          color={isLit ? "#dc2626" : "#475569"}
          roughness={0.9}
          emissive={isLit ? "#4c1d95" : "#000000"}
          emissiveIntensity={isLit ? 0.05 : 0}
        />
      </mesh>

      {/* Windows */}
      <RoundedBox args={[0.4, 0.4, 0.05]} radius={0.05} position={[-0.6, 1.8, 1.01]} castShadow>
        <meshStandardMaterial
          color={isLit ? "#fbbf24" : "#334155"}
          emissive={isLit ? "#fbbf24" : "#000000"}
          emissiveIntensity={isLit ? 0.3 : 0}
        />
      </RoundedBox>

      <RoundedBox args={[0.4, 0.4, 0.05]} radius={0.05} position={[0.6, 1.8, 1.01]} castShadow>
        <meshStandardMaterial
          color={isLit ? "#fbbf24" : "#334155"}
          emissive={isLit ? "#fbbf24" : "#000000"}
          emissiveIntensity={isLit ? 0.3 : 0}
        />
      </RoundedBox>

      {/* Door */}
      <RoundedBox args={[0.5, 1, 0.05]} radius={0.05} position={[0, 0.5, 1.01]} castShadow>
        <meshStandardMaterial color={isLit ? "#92400e" : "#475569"} roughness={0.8} />
      </RoundedBox>

      {isLit && <pointLight position={[0, 1.5, 1.5]} intensity={0.4} color="#fbbf24" distance={5} decay={2} />}
    </group>
  )
}
