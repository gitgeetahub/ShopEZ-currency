import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CurrencyCode } from "./products";

type User = { email: string; name: string };
type CartItem = { id: string; qty: number };

type Store = {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  cart: CartItem[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const Ctx = createContext<Store | null>(null);

function read<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setUser(read<User | null>("shopez_user", null));
    setCurrencyState(read<CurrencyCode>("shopez_currency", "INR"));
    setCart(read<CartItem[]>("shopez_cart", []));
  }, []);

  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("shopez_user", JSON.stringify(user)); }, [user]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("shopez_currency", JSON.stringify(currency)); }, [currency]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("shopez_cart", JSON.stringify(cart)); }, [cart]);

  const value: Store = {
    user,
    login: (email, name) => setUser({ email, name }),
    logout: () => setUser(null),
    currency,
    setCurrency: setCurrencyState,
    cart,
    addToCart: (id) =>
      setCart((c) => {
        const found = c.find((i) => i.id === id);
        return found ? c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) : [...c, { id, qty: 1 }];
      }),
    removeFromCart: (id) => setCart((c) => c.filter((i) => i.id !== id)),
    clearCart: () => setCart([]),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be inside StoreProvider");
  return v;
};