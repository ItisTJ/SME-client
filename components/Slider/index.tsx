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
  {
    id: 1,
    title: "Corporate Events",
    description:
      "Professional event planning and management for corporate gatherings, conferences, and team building activities.",
    image: "/image.png",
  },
  {
    id: 2,
    title: "Wedding Planning",
    description: "Complete wedding planning services from venue selection to day-of coordination for your perfect day.",
    image: "/image.png",
  },
  {
    id: 3,
    title: "Costume Rentals",
    description:
      "Extensive collection of high-quality costumes for themed parties, theater productions, and special events.",
    image: "/image.png",
  },
  {
    id: 4,
    title: "Birthday Parties",
    description:
      "Fun and memorable birthday party planning with themed decorations, entertainment, and catering options.",
    image: "/image.png",
  },
  {
    id: 5,
    title: "Holiday Events",
    description: "Seasonal event planning for holidays and special occasions with custom themes and decorations.",
    image: "/image.png",
  },
  {
    id: 6,
    title: "Theater Productions",
    description: "Complete costume and prop services for theater productions, including custom designs and rentals.",
    image: "/image.png",
  },
]

export default function ServicesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === servicesData.length - 1 ? 0 : prevIndex + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === servicesData.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? servicesData.length - 1 : prevIndex - 1))
  }

  const getVisibleCards = () => {
    const cards = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % servicesData.length
      cards.push(servicesData[index])
    }
    return cards
  }

  return (
    <section className="py-16 bg-gradient-to-b from-green-800/20 via-black via-green-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 overflow-visible">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-0 md:translate-y-[-120px]">
          <h2 className="text-3xl md:text-7xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From corporate events to costume rentals, we provide comprehensive solutions to make your special occasions
            unforgettable and professionally managed.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque saepe culpa exercitationem, commodi quibusdam quos aliquid similique, tempore soluta sequi error natus excepturi tenetur deserunt aspernatur dolores officiis dolore repellendus.
          </p>
        </div>

        {/* Slider Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {getVisibleCards().map((service, index) => (
              <Card
                key={`${service.id}-${currentIndex}-${index}`}
                className="group hover:shadow-lg transition-all duration-300 border-purple-900 border-2 hover:scale-[105%] hover:shadow-md hover:shadow-purple-950 transition-transform duration-500 ease-in-out"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-108 transition-transform duration-300"
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
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label="Previous services"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {servicesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-white" : "bg-purple-400/50 hover:bg-purple-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label="Next services"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
