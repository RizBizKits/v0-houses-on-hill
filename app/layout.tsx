import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Sarina, Be_Vietnam_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const sarina = Sarina({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sarina",
})

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
})

export const metadata: Metadata = {
  title: "TGLI",
  description: "The Great Lock In",
  generator: "v0.app",
  openGraph: {
    title: "TGLI",
    description: "The Great Lock In",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Great Lock In",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TGLI",
    description: "The Great Lock In",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 fontSize=%2290%22>🔒</text></svg>",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${sarina.variable} ${beVietnamPro.variable}`}
      >
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
