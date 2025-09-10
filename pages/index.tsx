
import HeroSection from "@/components/Hero";
import HorizontalRunner from "@/components/HorizontalRunner";

const stat = [
  { label : "Users", value: 100 },
  { label : "AI Agents", value: 50 },
  { label : "Enterprise", value: 500 }
]

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HorizontalRunner stats={stat} duration={3000}/>
      <HeroSection />
    </div>
  );
}
