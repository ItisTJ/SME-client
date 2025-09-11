"use client"

import { FlowerIcon } from "lucide-react"
import { PulsingBorder } from "@paper-design/shaders-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-black to-purple-1000 z-0" />

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Text content */}
          <div className="space-y-8 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm">
              <FlowerIcon className="w-4 h-4 text-purple-400" />
              Feel the moment in the best way possible
            </div>

            <div className="space-y-6">
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight leading-tight">
                Welcome to{" "}
                <span className="text-5xl lg:text-7xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Smart Media
                </span>
              </h1>

              <p className="text-md lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                Experience the future of productivity with an AI agent that understands you,
                learns from you, and works tirelessly to make your life easier.
              </p>
            </div>

            <div className="flex items-center gap-8 pt-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available 24/7
              </div>
              <div>No setup required</div>
              <div>Enterprise ready</div>
            </div>
          </div>

          {/* Right side - Animation */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="relative w-[300px] sm:w-[535px] lg:w-[800px] h-[511px]">
              {/* Pulsing Border + Logo */}
              <div className="relative flex items-center justify-center w-full h-full z-10">
                <PulsingBorder
                  colors={["#5800FF", "#BEECFF", "#E77EDC", "#FF4C3E"]}
                  colorBack="rgba(0, 0, 0, 0)"
                  speed={0.5}
                  roundness={1}
                  thickness={0.05}
                  softness={0.1}
                  intensity={0.3}
                  spotSize={0.1}
                  pulse={0.2}
                  smoke={0.3}
                  smokeSize={2}
                  scale={0.65}
                  rotation={0}
                  frame={9161408.251009725}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "0px",
                  }}
                />
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={350}
                  height={350}
                  className="absolute w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] object-contain"
                />
              </div>

              {/* Floating elements */}
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
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </div>
  )
}
