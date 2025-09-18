"use client"

import dynamic from "next/dynamic"

const SuburbScene = dynamic(() => import("@/components/suburb-scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>
  ),
})

export default function SuburbSceneClient() {
  return <SuburbScene />
}
