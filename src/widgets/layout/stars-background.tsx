"use client"

import * as React from "react"
import { PointMaterial, Points, Preload } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import * as THREE from "three"

interface BackgroundProps {
  rotationX?: number
  rotationY?: number
}

function Stars({ rotationX = 20, rotationY = 30 }: BackgroundProps) {
  const { theme } = useTheme()
  const ref = React.useRef<THREE.Points | null>(null)

  const positions = React.useMemo(() => {
    const vertices = []
    for (let count = 0; count < 10000; count++) {
      const x = 2000 * Math.random() - 1000
      const y = 2000 * Math.random() - 1000
      const z = 2000 * Math.random() - 1000

      vertices.push(x, y, z)
    }
    return new THREE.Float32BufferAttribute(vertices, 3).array as Float32Array
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / rotationX
      ref.current.rotation.y -= delta / rotationY
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} stride={3} positions={positions} frustumCulled>
        <PointMaterial
          transparent
          color={theme === "light" ? "#000" : "#fff"}
          size={0.75}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

function StarsBackground({ rotationX, rotationY }: BackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <React.Suspense fallback={null}>
          <Stars rotationX={rotationX} rotationY={rotationY} />
        </React.Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}
export default StarsBackground
