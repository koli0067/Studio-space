import CallToAction from "@/components/home/CallToAction";
import HeroSection from "@/components/home/HeroSection";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HowItWorks from "@/components/home/HowItWorks";
import HostGuarantee from "@/components/home/HostGuarantee";
import PopularCategories from "@/components/home/PopularCategories";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <HeroSection></HeroSection>
    <FeaturedStudios></FeaturedStudios>
    <PopularCategories></PopularCategories>
    <WhyChooseUs></WhyChooseUs>
    <HowItWorks></HowItWorks>
    <HostGuarantee></HostGuarantee>
    <Testimonials></Testimonials>
    <CallToAction></CallToAction>
   </div>
  );
}
