import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import DiscountBanner from "@/components/DiscountBanner";
import Amenities from "@/components/Amenities";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Location from "@/components/Location";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <DiscountBanner />
      <Amenities />
      <Gallery />
      <Testimonials />
      <Location />
      <Contact />
    </>
  );
}