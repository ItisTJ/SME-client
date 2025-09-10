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
  const relativeScroll = Math.max(scrollY - sectionTop, 0)
  const characterPosition = Math.max(100 - (relativeScroll / 500) * 100, 0)
  const characterSrc =
    scrollDirection === "down"
      ? "/animation/garfield-gato.gif"
      : scrollDirection === "up"
      ? "/animation/garfield-gato-reverce.gif"
      : "/animation/garfield-gato.png"

  const isAtLeftCorner = characterPosition <= 0

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-gradient-to-t from-green-950 via-black to-purple-950 overflow-hidden"
    >
      {/* Status / Stats */}
      <div className="absolute top-0 left-0 w-full h-[40%]">
        <Status stats={stats} duration={duration} />
      </div>

      {/* Garfield Character */}
      <div
        className="absolute bottom-10 transition-all duration-700 ease-out"
        style={{
          left: `${characterPosition}%`,
          transform: `translateX(-50%) scale(${isAtLeftCorner ? 0 : 1})`,
        }}
      >
        <Image
          src={characterSrc}
          alt="Garfield running"
          width={250}
          height={250}
          className="select-none transition-transform duration-700 ease-in-out"
        />
        <div className="h-full w-[400%] rounded-xl bg-black border-2 border-purple-600 absolute top-0 left-[260px]">
          <div className="space-y-6 mt-6 ml-auto mr-auto justify-center p-4">
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight leading-tight">
                We offer{" "}
                <span className="text-5xl lg:text-7xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Best MASCOTs
                </span>
              </h1>

              <p className="text-md lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                Experience the future of productivity with an AI agent that understands you,
                learns from you, and works tirelessly to make your life easier.
              </p>
            </div>
        </div>

      </div>

      {/* Ground line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300"></div>
    </section>
  )
}

export default HeroSection
