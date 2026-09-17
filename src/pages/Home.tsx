import Hero from "../components/home/Hero";
import ImageCarousel from "../components/home/ImageCarousel";
import DemoVideo from "../components/home/DemoVideo";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import CtaBanner from "../components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ImageCarousel />
      <DemoVideo />
      <Features />
      <HowItWorks />
      <CtaBanner />
    </>
  );
}
