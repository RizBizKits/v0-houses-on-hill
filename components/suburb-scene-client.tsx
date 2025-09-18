"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

const SuburbScene = dynamic(() => import("@/components/suburb-scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>
  ),
})

export default function SuburbSceneClient() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoplayFailed, setAutoplayFailed] = useState(false)

  useEffect(() => {
    const attemptAutoplay = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.3
          await audioRef.current.play()
          setIsPlaying(true)
          setAutoplayFailed(false)
        } catch (error) {
          console.log("Autoplay blocked by browser:", error)
          setAutoplayFailed(true)
          setIsPlaying(false)
        }
      }
    }

    // Small delay to ensure audio element is ready
    const timer = setTimeout(attemptAutoplay, 100)
    return () => clearTimeout(timer)
  }, [])

  const toggleAudio = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause()
          setIsPlaying(false)
        } else {
          audioRef.current.volume = 0.3
          await audioRef.current.play()
          setIsPlaying(true)
          setAutoplayFailed(false)
        }
      } catch (error) {
        console.log("Audio play failed:", error)
      }
    }
  }

  useEffect(() => {
    const handleAudioEnd = () => {
      setIsPlaying(false)
    }

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnd)
      return () => {
        audioRef.current?.removeEventListener("ended", handleAudioEnd)
      }
    }
  }, [])

  return (
    <>
      <audio ref={audioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/257941__kane53126__night-time-amb-OFRajA5Q7nM7GnltnI5qcsBQpPO5Lt.wav" loop preload="auto" style={{ display: "none" }} />

      <button
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
        title={autoplayFailed && !isPlaying ? "Play ambient sound" : isPlaying ? "Mute sound" : "Unmute sound"}
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>

      <SuburbScene />
    </>
  )
}
