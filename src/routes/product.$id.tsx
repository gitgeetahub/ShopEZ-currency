import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { products, formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { StarRating } from "@/components/StarRating";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl p-10 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <Link to="/" className="mt-4 inline-block text-primary hover:underline">Back to catalog</Link>
    </main>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { currency, addToCart } = useStore();
  const discounted = product.priceINR * (1 - product.discount / 100);

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2">
      <img src={product.image} alt={product.name} className="w-full rounded-lg border object-cover" />
      <div>
        <div className="text-xs uppercase text-muted-foreground">{product.category}</div>
        <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
        <div className="mt-2"><StarRating value={product.rating} size={18} /></div>
        <div className="mt-1 text-sm text-muted-foreground">{product.reviews} customer reviews</div>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-3xl font-bold">{formatPrice(discounted, currency)}</span>
          <span className="text-muted-foreground line-through">{formatPrice(product.priceINR, currency)}</span>
          <span className="rounded bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-800">-{product.discount}% OFF</span>
        </div>
        <p className="mt-6 text-muted-foreground">{product.description}</p>
        <div className="mt-4 text-sm">Sold by <span className="font-semibold">{product.seller}</span></div>
        <div className="mt-6 flex gap-3">
          <button onClick={() => addToCart(product.id)} className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
            Add to Cart
          </button>
          <Link to="/cart" className="rounded-md border px-6 py-3 font-semibold hover:bg-accent">Go to Cart</Link>
        </div>
      </div>
    </main>
  );
}