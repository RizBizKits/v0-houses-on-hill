"use client"

export function Hill() {
  return (
    <mesh position={[0, -1, 0]} receiveShadow>
      <cylinderGeometry args={[12, 12, 2, 32]} />
      <meshStandardMaterial color="#22c55e" roughness={0.9} metalness={0.1} />
    </mesh>
  )
}
