"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Status from "@/components/Status"

interface HeroSectionProps {
  stats: { label: string; value: number; suffix?: string }[]
  duration?: number
}

export function HeroSection({ stats, duration = 3000 }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState("idle")
  const sectionRef = useRef<HTMLElement | null>(null)
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current) setScrollDirection("down")
      else if (currentScrollY < lastScrollY.current) setScrollDirection("up")

      setScrollY(currentScrollY)
      lastScrollY.current = currentScrollY

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => setScrollDirection("idle"), 500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [])

  const sectionTop = sectionRef.current?.offsetTop || 0
  const relativeScroll = Math.max(scrollY - (sectionTop - 400), 0)
  const characterPosition = Math.max(100 - (relativeScroll / 500) * 100, 0)
  const isAtLeftCorner = characterPosition <= 0
  const characterSrc =
    isAtLeftCorner?
      "/animation/garfield-gato.png" :
    (scrollDirection === "down" && !isAtLeftCorner)
      ? "/animation/garfield-gato.gif"
      : (scrollDirection === "up" && !isAtLeftCorner)
      ? "/animation/garfield-gato-reverce.gif"
      : "/animation/garfield-gato.png"



  return (
  <section
    ref={sectionRef}
    className="relative h-screen bg-gradient-to-t from-green-800/20 via-purple-950 to-black overflow-hidden"
  >
    {/* Status / Stats */}
    <div className="absolute top-0 left-0 w-full h-[40%]">
      <Status stats={stats} duration={duration} />
    </div>

    {/* Garfield + Text box */}
    <div
      className="absolute bottom-10 md:bottom-50 transition-all duration-700 ease-out w-full px-4 "
      style={{ left: `${characterPosition}%` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-6xl mx-auto">
        {/* Garfield Image */}
        <div className="flex justify-center w-[100px] sm:w-full md:justify-center">
          <Image
            src={characterSrc}
            alt="Garfield running"
            width={350}
            height={350}
            className="select-none transition-transform duration-700 ease-in-out"
          />
        </div>

        {/* Black Text Box */}
        <div className="w-full rounded-xl bg-black border-2 border-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50 p-6">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-white text-3xl lg:text-5xl font-bold tracking-tight leading-tight">
              We offer best{" "}
              <span className="text-5xl lg:text-7xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                MASCOTs
              </span>
            </h1>

            <p className="text-md lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Experience the future of productivity with an AI agent that understands you,
              learns from you, and works tirelessly to make your life easier.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

}

export default HeroSection
