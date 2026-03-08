import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => (
  <section className="relative flex min-h-[85vh] items-center overflow-hidden">
    <img src={heroBanner} alt="Hero sneaker" className="absolute inset-0 h-full w-full object-cover" />
    <div className="hero-overlay absolute inset-0" />
    <div className="container relative z-10 mx-auto px-4">
      <div className="max-w-2xl animate-fade-in">
        <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-semibold text-primary-foreground backdrop-blur-sm">
          New Collection 2026
        </span>
        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-primary-foreground md:text-7xl">
          Step Into <br />
          <span className="text-gradient">Your Style</span>
        </h1>
        <p className="mt-4 max-w-lg text-lg text-primary-foreground/80">
          Discover premium sneakers crafted for performance and style. From the track to the street.
        </p>
        <div className="mt-8 flex gap-4">
          <Link to="/shop">
            <Button size="lg" className="shadow-button">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
