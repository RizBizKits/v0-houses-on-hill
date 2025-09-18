"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef } from "react"

const SuburbScene = dynamic(() => import("@/components/suburb-scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>
  ),
})

export default function SuburbSceneClient() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const playAmbientSound = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.3 // Set to 30% volume
          await audioRef.current.play()
        } catch (error) {
          // Auto-play might be blocked by browser policy
          console.log("Audio auto-play blocked:", error)
        }
      }
    }

    playAmbientSound()
  }, [])

  return (
    <>
      <audio ref={audioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/257941__kane53126__night-time-amb-OFRajA5Q7nM7GnltnI5qcsBQpPO5Lt.wav" loop preload="auto" style={{ display: "none" }} />
      <SuburbScene />
    </>
  )
}
