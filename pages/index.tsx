
import DetailedServices from "@/components/DetailedServices";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import HorizontalRunner from "@/components/HorizontalRunner";
import Slider from "@/components/Slider";

const stat = [
  { label : "Mascots", value: 12 },
  { label : "Clients", value: 100 },
  { label : "Successful events", value: 200 }
]

export default function Home() {
  return (
    <div className="overflow-hidden max-w-screen bg-black">
      <HeroSection />
      <HorizontalRunner stats={stat} duration={3000}/>
      <Slider /> 
      <DetailedServices />   
      <Footer />
    </div>
  );
}
