import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { products, formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — ShopEZ" }] }),
  component: Cart,
});

function Cart() {
  const { cart, removeFromCart, currency, clearCart, user } = useStore();
  const nav = useNavigate();
  const [orderId, setOrderId] = useState<string | null>(null);

  const items = cart
    .map((c) => {
      const p = products.find((x) => x.id === c.id);
      return p ? { ...p, qty: c.qty } : null;
    })
    .filter(Boolean) as Array<(typeof products)[number] & { qty: number }>;

  const total = items.reduce((s, i) => s + i.priceINR * (1 - i.discount / 100) * i.qty, 0);

  const checkout = () => {
    if (!user) { nav({ to: "/login" }); return; }
    const id = "SHZ-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrderId(id);
    clearCart();
  };

  if (orderId) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="rounded-xl border bg-card p-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">✓</div>
          <h1 className="text-2xl font-bold">Order Confirmed</h1>
          <p className="mt-2 text-muted-foreground">Thanks for shopping with ShopEZ.</p>
          <p className="mt-4 text-sm">Order ID: <span className="font-mono font-semibold">{orderId}</span></p>
          <Link to="/" className="mt-6 inline-block rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Your Cart</h1>
      {items.length === 0 ? (
        <div className="rounded-lg border bg-card p-10 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">Browse products →</Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.id} className="flex gap-4 rounded-lg border bg-card p-3">
                <img src={i.image} alt={i.name} className="h-24 w-24 rounded object-cover" />
                <div className="flex-1">
                  <Link to="/product/$id" params={{ id: i.id }} className="font-semibold hover:text-primary">{i.name}</Link>
                  <div className="text-xs text-muted-foreground">{i.category} · Qty {i.qty}</div>
                  <div className="mt-2 font-bold">{formatPrice(i.priceINR * (1 - i.discount / 100) * i.qty, currency)}</div>
                </div>
                <button onClick={() => removeFromCart(i.id)} className="self-start rounded p-2 text-muted-foreground hover:bg-accent hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-lg border bg-card p-4">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="mt-4 flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(total, currency)}</span></div>
            <div className="mt-1 flex justify-between text-sm"><span>Shipping</span><span className="text-green-700">Free</span></div>
            <div className="mt-3 flex justify-between border-t pt-3 font-bold"><span>Total</span><span>{formatPrice(total, currency)}</span></div>
            <button onClick={checkout} className="mt-4 w-full rounded-md bg-primary py-2 font-semibold text-primary-foreground hover:bg-primary/90">
              {user ? "Secure Checkout" : "Login to Checkout"}
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}