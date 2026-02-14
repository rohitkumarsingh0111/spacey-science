'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function FloatingPlanet() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    meshRef.current.rotation.y += 0.001
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime) * 0.2
  })

  return (
    <mesh ref={meshRef} position={[2, 0, -2]}>
      <sphereGeometry args={[0.7, 64, 64]} />
      <meshStandardMaterial color="#4f46e5" />
    </mesh>
  )
}

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 2]} />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <FloatingPlanet />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
