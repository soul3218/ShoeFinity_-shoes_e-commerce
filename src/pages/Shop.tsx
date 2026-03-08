import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShoeCard from "@/components/ShoeCard";
import { useShoes } from "@/contexts/ShoeContext";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Shop = () => {
  const { shoes } = useShoes();
  const [category, setCategory] = useState("All");
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();

  const categories = ["All", ...Array.from(new Set(shoes.map((s) => s.category)))];
  const filteredByCategory = category === "All" ? shoes : shoes.filter((s) => s.category === category);
  const q = query.toLowerCase();
  const filtered =
    q.length === 0
      ? filteredByCategory
      : filteredByCategory.filter((s) => {
          const haystack = `${s.name} ${s.description} ${s.category}`.toLowerCase();
          return haystack.includes(q);
        });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            All <span className="text-gradient">Sneakers</span>
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-primary text-primary-foreground shadow-button"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((shoe, i) => (
              <div key={shoe._id} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <ShoeCard shoe={shoe} />
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="mt-12 text-center text-muted-foreground">
              {query ? `No shoes found for "${query}".` : "No shoes found in this category."}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
