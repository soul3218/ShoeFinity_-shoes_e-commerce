import ShoeCard from "@/components/ShoeCard";
import { useShoes } from "@/contexts/ShoeContext";

const FeaturedSection = () => {
  const { shoes } = useShoes();
  const featured = shoes.slice(0, 3);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Featured <span className="text-gradient">Drops</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Hand-picked selections for the season</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((shoe, i) => (
            <div key={shoe._id} className="animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
              <ShoeCard shoe={shoe} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
