"use client"

import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import { useState, useEffect } from "react"
import { House } from "./house"
import { Hill } from "./hill"
import { Streetlight } from "./streetlight"
import { useIsMobile } from "../hooks/use-mobile"

export default function SuburbScene() {
  const [litHouses, setLitHouses] = useState<Set<number>>(new Set())
  const [showTitle, setShowTitle] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)
  const [daysLeft, setDaysLeft] = useState(0)
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const calculateDaysLeft = () => {
      const now = new Date()
      const nextYear = now.getFullYear() + 1
      const jan1 = new Date(nextYear, 0, 1) // January 1st of next year

      // Reset time to start of day for both dates to get exact day difference
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const targetDate = new Date(nextYear, 0, 1)
      const diffTime = targetDate.getTime() - today.getTime()
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      setDaysLeft(diffDays)
    }

    calculateDaysLeft()
    // Update daily
    const interval = setInterval(calculateDaysLeft, 24 * 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [mounted])

  const houses = [
    { position: [-8, 0.2, 6] as [number, number, number], scale: 0.7 },
    { position: [-5, 0.5, 5] as [number, number, number], scale: 0.8 },
    { position: [-2, 0.8, 5] as [number, number, number], scale: 0.9 },
    { position: [1, 0.9, 5] as [number, number, number], scale: 0.8 },
    { position: [4, 0.7, 5] as [number, number, number], scale: 0.9 },
    { position: [7, 0.4, 6] as [number, number, number], scale: 0.7 },
    { position: [-7, 0.8, 3] as [number, number, number], scale: 0.9 },
    { position: [-4, 1.1, 2] as [number, number, number], scale: 1.0 },
    { position: [-1, 1.4, 2] as [number, number, number], scale: 1.1 },
    { position: [2, 1.6, 2] as [number, number, number], scale: 1.2 },
    { position: [5, 1.3, 2] as [number, number, number], scale: 1.0 },
    { position: [8, 1.0, 3] as [number, number, number], scale: 0.9 },
    { position: [-6, 1.5, 0] as [number, number, number], scale: 1.1 },
    { position: [-3, 1.8, -1] as [number, number, number], scale: 1.2 },
    { position: [0, 2.1, -1] as [number, number, number], scale: 1.3 },
    { position: [3, 1.9, -1] as [number, number, number], scale: 1.2 },
    { position: [6, 1.6, 0] as [number, number, number], scale: 1.1 },
    { position: [-9, 0.3, 4] as [number, number, number], scale: 0.6 },
    { position: [9, 0.5, 4] as [number, number, number], scale: 0.6 },
    { position: [-8, 1.2, 1] as [number, number, number], scale: 0.8 },
    { position: [8, 1.4, 1] as [number, number, number], scale: 0.8 },
  ]

  useEffect(() => {
    if (!mounted) return

    const randomizedIndices = [...Array(houses.length).keys()].sort(() => Math.random() - 0.5)
    let currentIndex = 0

    const lightNextHouse = () => {
      if (currentIndex < randomizedIndices.length) {
        const houseIndex = randomizedIndices[currentIndex]
        setLitHouses((prev) => new Set([...prev, houseIndex]))

        // Show title when first house lights up
        if (currentIndex === 0) {
          setShowTitle(true)
          setTimeout(() => {
            setShowCountdown(true)
          }, 1000)
        }

        currentIndex++

        // Schedule next house to light up after 3 seconds
        if (currentIndex < randomizedIndices.length) {
          setTimeout(lightNextHouse, 3000)
        }
      }
    }

    // Start the sequence after initial 3-second delay
    const initialTimer = setTimeout(lightNextHouse, 3000)

    return () => clearTimeout(initialTimer)
  }, [mounted])

  if (!mounted) {
    return <div className="w-full h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <div className="w-full h-screen relative bg-slate-800">
      <div
        className={`absolute ${
          isMobile ? "top-8" : "top-20"
        } left-1/2 transform -translate-x-1/2 z-10 transition-opacity duration-1000 ${
          showTitle ? "opacity-100" : "opacity-0"
        } ${isMobile ? "px-4" : ""}`}
      >
        <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-sarina text-center drop-shadow-2xl leading-tight">
          The Great Lock In
        </h1>
        <p
          className={`text-white text-lg sm:text-xl md:text-2xl font-be-vietnam-pro font-medium text-center mt-2 sm:mt-4 drop-shadow-lg transition-opacity duration-1000 ${
            showCountdown ? "opacity-100" : "opacity-0"
          }`}
        >
          {daysLeft} days remaining
        </p>
      </div>

      {mounted && (
        <Canvas
          shadows
          gl={{
            antialias: !isMobile, // Disable antialiasing on mobile for better performance
            alpha: false,
            powerPreference: isMobile ? "default" : "high-performance", // Use default power on mobile
          }}
          dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower DPR on mobile for performance
          performance={{ min: isMobile ? 0.3 : 0.5 }} // Lower performance threshold on mobile
          onCreated={() => {}}
        >
          <PerspectiveCamera makeDefault position={[0, 8, 15]} />
          <ambientLight intensity={0.3} color="#1e3a8a" />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.4}
            color="#3b82f6"
            castShadow={!isMobile} // Disable shadows on mobile for performance
            shadow-mapSize={isMobile ? [128, 128] : [256, 256]} // Lower shadow resolution on mobile
            shadow-camera-left={-15}
            shadow-camera-right={15}
            shadow-camera-top={15}
            shadow-camera-bottom={-15}
            shadow-camera-near={1}
            shadow-camera-far={30}
          />
          <pointLight position={[8, 12, -5]} intensity={0.4} color="#fef3c7" distance={40} />
          <color attach="background" args={["#0f172a"]} />
          <fog attach="fog" args={["#334155", 15, 35]} />
          <Hill />

          {houses.map((house, index) => (
            <House key={index} position={house.position} isLit={litHouses.has(index)} scale={house.scale} />
          ))}

          <Streetlight position={[-4, 0, 4]} />
          <Streetlight position={[4, 0, 4]} />
          <Streetlight position={[-7, 0, 2]} />
          <Streetlight position={[7, 0, 2]} />
        </Canvas>
      )}
    </div>
  )
}
