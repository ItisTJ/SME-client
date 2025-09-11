"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface StatItem {
  label: string
  value: number
  suffix?: string
}

interface AnimatedStatsProps {
  stats: StatItem[]
  duration?: number
}

export default function AnimatedStats({ stats, duration = 2000 }: AnimatedStatsProps) {
  const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0))
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true)

          stats.forEach((stat, index) => {
            const startTime = Date.now()
            const startValue = 0
            const endValue = stat.value

            const animate = () => {
              const now = Date.now()
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)

              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4)
              const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart)

              setAnimatedValues((prev) => {
                const newValues = [...prev]
                newValues[index] = currentValue
                return newValues
              })

              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }

            requestAnimationFrame(animate)
          })
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("animated-stats")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [stats, duration, hasStarted])

  return (
<div id="animated-stats" className="relative grid grid-cols-1 md:grid-cols-3 gap-8 py-12">

  {/* Stats content */}
  {stats.map((stat, index) => (
    <div key={index} className="relative z-10 text-center">
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
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
        {animatedValues[index].toLocaleString()}
        {stat.suffix || ""}
      </div>
      <div className="text-lg sm:text-xl md:text-2xl text-gray-400 font-medium">
        {stat.label}
      </div>
    </div>
  ))}
</div>

  )
}
