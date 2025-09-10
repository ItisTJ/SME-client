
import HeroSection from "@/components/Hero";
import HorizontalRunner from "@/components/HorizontalRunner";
import MascotSection from "@/components/Mascot";

const stat = [
  { label : "Users", value: 100 },
  { label : "AI Agents", value: 50 },
  { label : "Enterprise", value: 500 }
]

export default function Home() {
  return (
    <div className="overflow-hidden max-w-screen">
      <HeroSection />
      <HorizontalRunner stats={stat} duration={3000}/>
      <MascotSection />
      <HeroSection/>      
    </div>
  );
}
