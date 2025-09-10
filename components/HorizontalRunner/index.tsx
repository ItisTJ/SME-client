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
      className="relative h-screen bg-gradient-to-t from-green-950 via-black to-purple-950 overflow-visible"
    >
      {/* Status / Stats */}
      <div className="absolute top-0 left-0 w-full h-[40%]">
        <Status stats={stats} duration={duration} />
      </div>
      

      {/* Garfield Character */}
      <div
        className="absolute bottom-30 transition-all duration-700 ease-out"
        style={{
          left: `${characterPosition}%`,

        }}
      >
        <Image
          src={characterSrc}
          alt="Garfield running"
          width={250}
          height={250}
          className="select-none transition-transform duration-700 ease-in-out"
        />
        <div className="h-full w-[400%] rounded-xl bg-black border-2 border-purple-600 absolute md:top-0 md:left-[260px] sm:top-260px sm:left-[260px] top-[300px] left-[260px] p-4 flex items-center justify-center shadow-lg shadow-purple-500/50">
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
        <div className="absolute top-0 left-[1300px] w-full h-full" >
                        <div
                className="absolute -top-4 -right-4 w-3 h-3 bg-purple-400 rounded-full animate-bounce z-30"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="absolute top-1/3 -left-6 w-2 h-2 bg-blue-400 rounded-full animate-bounce z-30"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-1/4 -right-8 w-4 h-4 bg-pink-400 rounded-full animate-bounce z-30"
                style={{ animationDelay: "2s" }}
              />
              <div
                className="absolute top-1/5 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-bounce z-30"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute bottom-1/3 left-1/7 w-3 h-3 bg-yellow-400 rounded-full animate-bounce z-30"
                style={{ animationDelay: "1.2s" }}
              />
              <div
                className="absolute top-2/3 right-1/6 w-2.5 h-2.5 bg-red-400 rounded-full animate-bounce z-30"
                style={{ animationDelay: "0.8s" }}
              />
              <div
                className="absolute bottom-1/5 left-5/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce z-30"
                style={{ animationDelay: "1.5s" }}
              />
              <div
                className="absolute top-1/4 left-1 w-2 h-2 bg-pink-300 rounded-full animate-bounce z-30"
                style={{ animationDelay: "2.2s" }}
              />
        </div>

      </div>

    </section>
  )
}

export default HeroSection
