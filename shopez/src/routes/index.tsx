import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories, formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { StarRating } from "@/components/StarRating";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { currency, addToCart } = useStore();
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [ratingMin, setRatingMin] = useState(0);
  const [ratingMax, setRatingMax] = useState(5);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.priceINR <= maxPrice &&
        p.rating >= ratingMin &&
        p.rating <= ratingMax &&
        p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.priceINR - b.priceINR);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.priceINR - a.priceINR);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, sort, maxPrice, ratingMin, ratingMax, query]);

  const ratingPresets: Array<[number, number, string]> = [
    [0, 5, "All ratings"],
    [3, 5, "3★ – 5★"],
    [4, 5, "4★ – 5★"],
    [4.5, 5, "4.5★ – 5★"],
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <section className="mb-8 rounded-2xl bg-gradient-to-r from-primary to-primary/70 p-8 text-primary-foreground">
        <h1 className="text-3xl font-bold sm:text-4xl">Effortless shopping starts here</h1>
        <p className="mt-2 max-w-xl text-primary-foreground/90">
          Browse thousands of products, compare prices in your currency, and enjoy secure checkout.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-6 rounded-lg border bg-card p-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-md border bg-background px-3 py-1.5 text-sm"
            />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Category</h3>
            <div className="flex flex-col gap-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded px-2 py-1 text-left text-sm ${category === c ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Max Price (INR)</h3>
            <input
              type="range"
              min={300}
              max={20000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground">Up to ₹{maxPrice.toLocaleString()}</div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Rating</h3>
            <div className="flex flex-col gap-1">
              {ratingPresets.map(([mn, mx, label]) => (
                <button
                  key={label}
                  onClick={() => { setRatingMin(mn); setRatingMax(mx); }}
                  className={`rounded px-2 py-1 text-left text-sm ${ratingMin === mn && ratingMax === mx ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Showing {ratingMin}★ – {ratingMax}★
            </div>
          </div>
        </aside>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">{filtered.length} products</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-md border bg-background px-3 py-1.5 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-lg border bg-card p-10 text-center text-muted-foreground">
              No products match your filters.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <article key={p.id} className="group flex flex-col overflow-hidden rounded-lg border bg-card transition hover:shadow-lg">
                  <Link to="/product/$id" params={{ id: p.id }} className="block overflow-hidden">
                    <img src={p.image} alt={p.name} loading="lazy" className="h-48 w-full object-cover transition group-hover:scale-105" />
                  </Link>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="text-xs uppercase text-muted-foreground">{p.category}</div>
                    <Link to="/product/$id" params={{ id: p.id }} className="font-semibold hover:text-primary">
                      {p.name}
                    </Link>
                    <StarRating value={p.rating} />
                    <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                      <div>
                        <div className="text-lg font-bold">{formatPrice(p.priceINR * (1 - p.discount / 100), currency)}</div>
                        <div className="text-xs text-muted-foreground line-through">{formatPrice(p.priceINR, currency)}</div>
                      </div>
                      <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">-{p.discount}%</span>
                    </div>
                    <button
                      onClick={() => addToCart(p.id)}
                      className="mt-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
