import CallToAction from "@/components/home/CallToAction";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PopularCategories from "@/components/home/PopularCategories";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <HeroSection></HeroSection>
    <PopularCategories></PopularCategories>
    <WhyChooseUs></WhyChooseUs>
    <HowItWorks></HowItWorks>
    <Testimonials></Testimonials>
    <CallToAction></CallToAction>
   </div>
  );
}
