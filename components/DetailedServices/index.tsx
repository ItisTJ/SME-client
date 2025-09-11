"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Palette, Music, Camera, Sparkles } from "lucide-react"
import Image from "next/image"

interface DetailedService {
  id: number
  title: string
  description: string
  features: string[]
  image: string
  icon: React.ReactNode
}

const detailedServicesData: DetailedService[] = [
  {
    id: 1,
    title: "Corporate Event Management",
    description:
      "Transform your corporate gatherings into memorable experiences with our comprehensive event management services. We handle everything from initial planning to final execution, ensuring your business events reflect your company's professionalism and values.",
    features: [
      "Venue selection and booking",
      "Catering coordination",
      "Audio-visual equipment setup",
      "Guest registration management",
      "On-site event coordination",
      "Post-event cleanup and reporting",
    ],
    image: "/animation/mickey-flies.gif",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Wedding Planning & Coordination",
    description:
      "Make your dream wedding a reality with our full-service wedding planning. From intimate ceremonies to grand celebrations, we ensure every detail is perfect for your special day.",
    features: [
      "Complete wedding timeline planning",
      "Vendor coordination and management",
      "Bridal party coordination",
      "Ceremony and reception setup",
      "Day-of wedding coordination",
      "Emergency backup planning",
    ],
    image: "/animation/mickey.gif",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Premium Costume Rentals",
    description:
      "Access our extensive collection of high-quality costumes for any occasion. From historical periods to fantasy characters, we have the perfect outfit to bring your vision to life.",
    features: [
      "Over 500 costume options",
      "Professional fitting services",
      "Accessories and props included",
      "Cleaning and maintenance included",
      "Custom alterations available",
      "Group rental discounts",
    ],
    image: "/animation/mickey.gif",
    icon: <Palette className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Birthday Party Celebrations",
    description:
      "Create unforgettable birthday memories with our themed party planning services. We specialize in both children's and adult birthday celebrations with custom themes and entertainment.",
    features: [
      "Custom theme development",
      "Decoration setup and teardown",
      "Entertainment coordination",
      "Cake and catering options",
      "Party favor preparation",
      "Photography services available",
    ],
    image: "/animation/mickey.gif",
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "Holiday & Seasonal Events",
    description:
      "Celebrate the seasons with our specialized holiday event planning. From Halloween parties to Christmas galas, we bring the magic of each season to your celebrations.",
    features: [
      "Seasonal decoration packages",
      "Holiday-themed entertainment",
      "Traditional and modern celebration styles",
      "Weather contingency planning",
      "Cultural celebration expertise",
      "Community event coordination",
    ],
    image: "/animation/mickey.gif",
    icon: <Music className="w-6 h-6" />,
  },
  {
    id: 6,
    title: "Theater & Performance Support",
    description:
      "Support your theatrical productions with our comprehensive costume and prop services. We work with schools, community theaters, and professional productions.",
    features: [
      "Period-accurate costume design",
      "Custom prop creation",
      "Makeup and styling consultation",
      "Quick-change solutions",
      "Bulk rental pricing",
      "Production timeline coordination",
    ],
    image: "/animation/mickey.gif",
    icon: <Camera className="w-6 h-6" />,
  },
]

export default function DetailedServices() {
  const [showAll, setShowAll] = useState(false)
  const displayedServices = showAll ? detailedServicesData : detailedServicesData.slice(0, 3)

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Detailed Service Offerings</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the full scope of our professional services. Each offering is designed to provide exceptional value
            and memorable experiences for your special events.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-8 mb-12">
          {displayedServices.map((service, index) => (
            <Card key={service.id} className="overflow-hidden border-border/50">
              <CardContent className="p-0">
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                  {/* Image Section */}
                  <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Image
                      width={300}
                      height={500}
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                  </div>

                  {/* Content Section */}
                  <div className={`p-8 lg:p-12 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">{service.icon}</div>
                      <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground mb-3">What is Included:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && detailedServicesData.length > 3 && (
          <div className="text-center">
            <Button
              onClick={() => setShowAll(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              Show More Services
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
