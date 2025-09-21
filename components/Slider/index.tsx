"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Service {
  id: number
  title: string
  description: string
  image: string
}

const servicesData: Service[] = [
  { id: 1, title: "Corporate Events", description: "Professional event planning and management for corporate gatherings, conferences, and team building activities.", image: "/image.png" },
  { id: 2, title: "Wedding Planning", description: "Complete wedding planning services from venue selection to day-of coordination for your perfect day.", image: "/image.png" },
  { id: 3, title: "Costume Rentals", description: "Extensive collection of high-quality costumes for themed parties, theater productions, and special events.", image: "/image.png" },
  { id: 4, title: "Birthday Parties", description: "Fun and memorable birthday party planning with themed decorations, entertainment, and catering options.", image: "/image.png" },
  { id: 5, title: "Holiday Events", description: "Seasonal event planning for holidays and special occasions with custom themes and decorations.", image: "/image.png" },
  { id: 6, title: "Theater Productions", description: "Complete costume and prop services for theater productions, including custom designs and rentals.", image: "/image.png" },
]

// Clone slides for infinite loop
const extendedServices = [
  ...servicesData.slice(-3), // last 3 slides at the start
  ...servicesData,
  ...servicesData.slice(0, 3), // first 3 slides at the end
]

export default function ServicesSlider() {
  const [currentIndex, setCurrentIndex] = useState(3)
  const [isAnimating, setIsAnimating] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const totalSlides = servicesData.length
  // Determine the active slide index (the "real" slide in the middle)
  const activeIndex = ((currentIndex - 3 + totalSlides) % totalSlides) + 1;

  

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      nextSlide()
    }, 3000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1)
    setIsAnimating(true)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1)
    setIsAnimating(true)
  }

  const [visibleSlides, setVisibleSlides] = useState(3)

// Update visible slides based on screen width
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) setVisibleSlides(1) // mobile
    else if (window.innerWidth < 1024) setVisibleSlides(2) // tablet
    else setVisibleSlides(3) // desktop
  }

  handleResize() // initial
  window.addEventListener("resize", handleResize)
  return () => window.removeEventListener("resize", handleResize)
}, [])


  // Infinite loop effect
  useEffect(() => {
    if (currentIndex >= totalSlides + 3) {
      const timeout = setTimeout(() => {
        setIsAnimating(false)
        setCurrentIndex(3)
      }, 700)
      return () => clearTimeout(timeout)
    }
    if (currentIndex < 3) {
      const timeout = setTimeout(() => {
        setIsAnimating(false)
        setCurrentIndex(totalSlides + 2)
      }, 700)
      return () => clearTimeout(timeout)
    }
    setIsAnimating(true)
  }, [currentIndex, totalSlides])

  return (
    <section className="py-16 bg-gradient-to-b from-green-800/20 via-black via-green-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 overflow-y-visible">
        {/* Header */}
        <div className="text-center mb-12 md:mb-0 md:translate-y-[-120px]">
          <h2 className="text-3xl md:text-7xl font-bold text-white mb-4">Our Events</h2>
          <p className="text-lg text-gray-400 max-w-6xl mx-auto">
            With countless successful events and campaigns behind us, Smart Media Entertainment has become a trusted name in promotions and event planning. From mascots and promo staff to full-scale physical marketing campaigns, we’ve proudly delivered engaging experiences for parties, brands, and communities — and we’re ready to bring the same energy to your next big event.
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Cards Row */}
          <div
            className={`flex ${isAnimating ? "transition-transform duration-700 ease-in-out" : ""}`}
            style={{
              transform: `translateX(-${(currentIndex * 100) / visibleSlides}%)`,
            }}
          >
            {extendedServices.map((service, idx) => {
              // Map clone slides to real slides
              const realIndex = (idx - 3 + totalSlides) % totalSlides;
              const isActive = realIndex === activeIndex;

              return (
                <div key={idx} className="w-[100%] md:w-[33.33%] flex-shrink-0 px-3">
                  <Card
                    className={`group h-full border-2 rounded-xl transition-transform duration-500 ${
                      isActive
                        ? "hover:scale-105 hover:shadow-xl shadow-green-800 border-green-900"
                        : "hover:scale-105 hover:shadow-xl hover:shadow-purple-950 border-purple-900"
                    }`}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          width={400}
                          height={200}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{service.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}

          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index + 3)} // +3 because of clones at start
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentIndex - 3 === index ? "bg-white" : "bg-purple-400/50 hover:bg-purple-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
