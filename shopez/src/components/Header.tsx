import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart, LogIn, LogOut, Store } from "lucide-react";
import { useStore } from "@/lib/store";
import { currencies, type CurrencyCode } from "@/lib/products";

export function Header() {
  const { user, logout, cart, currency, setCurrency } = useStore();
  const nav = useNavigate();
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Store className="h-6 w-6" />
          ShopEZ
        </Link>
        <div className="flex items-center gap-3">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="rounded-md border bg-background px-2 py-1 text-sm"
            aria-label="Currency"
          >
            {Object.entries(currencies).map(([c, v]) => (
              <option key={c} value={c}>{c} — {v.symbol.trim()}</option>
            ))}
          </select>
          <Link to="/cart" className="relative inline-flex items-center rounded-md p-2 hover:bg-accent">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-muted-foreground sm:inline">Hi, {user.name}</span>
              <button
                onClick={() => { logout(); nav({ to: "/" }); }}
                className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <LogIn className="h-4 w-4" /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}