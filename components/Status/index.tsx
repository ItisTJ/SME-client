"use client"

import { useEffect, useState } from "react"

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
    <div key={index} className="relative z-10 text-center border border-gray-700/50 rounded-4xl p-6 bg-black/30 backdrop-blur-sm mx-4 hover:scale-[1.08] hover:text-green transition-transform duration-300">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pink-400 mb-2">
        {animatedValues[index].toLocaleString()} +
      </div>
      <div className="text-lg sm:text-xl md:text-2xl text-purple-400 font-medium">
        {stat.label}
      </div>
    </div>
  ))}
</div>

  )
}
