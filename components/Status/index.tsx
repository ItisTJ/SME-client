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
  {/* Background GIF */}
  <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none width-full h-full">
    <Image
      src="/animation/mickey.gif"
      alt="Logo"
      width={450}
      height={450}
      className="w-40 sm:w-60 md:w-72 lg:w-96 h-auto opacity-20"
    />
  </div>

  {/* Stats content */}
  {stats.map((stat, index) => (
    <div key={index} className="relative z-10 text-center">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-2">
        {animatedValues[index].toLocaleString()}
        {stat.suffix || ""}
      </div>
      <div className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium">
        {stat.label}
      </div>
    </div>
  ))}
</div>

  )
}
