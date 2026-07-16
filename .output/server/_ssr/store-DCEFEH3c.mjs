import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DCEFEH3c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_BASE_URL = "http://localhost:5000/api";
async function request(path, options = {}) {
	const headers = new Headers(options.headers);
	if (!headers.has("Content-Type") && options.body) headers.set("Content-Type", "application/json");
	const token = typeof window !== "undefined" ? window.localStorage.getItem("shopez_token") : null;
	if (token) headers.set("Authorization", `Bearer ${token}`);
	const response = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers
	});
	const data = await response.json().catch(() => null);
	if (!response.ok) throw new Error(data?.message || "Request failed");
	return data;
}
async function fetchProducts() {
	return request("/products");
}
async function fetchProductById(id) {
	return request(`/products/${id}`);
}
async function registerUser(name, email, password) {
	return request("/auth/register", {
		method: "POST",
		body: JSON.stringify({
			name,
			email,
			password
		})
	});
}
async function loginUser(email, password) {
	return request("/auth/login", {
		method: "POST",
		body: JSON.stringify({
			email,
			password
		})
	});
}
async function getCurrentUser() {
	return request("/auth/me");
}
var Ctx = (0, import_react.createContext)(null);
function read(k, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const v = window.localStorage.getItem(k);
		return v ? JSON.parse(v) : fallback;
	} catch {
		return fallback;
	}
}
function StoreProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [token, setToken] = (0, import_react.useState)(null);
	const [authReady, setAuthReady] = (0, import_react.useState)(false);
	const [currency, setCurrencyState] = (0, import_react.useState)("INR");
	const [cart, setCart] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const savedUser = read("shopez_user", null);
		const savedToken = read("shopez_token", null);
		setUser(savedUser);
		setToken(savedToken);
		setCurrencyState(read("shopez_currency", "INR"));
		setCart(read("shopez_cart", []));
		if (savedToken) getCurrentUser().then(({ user: currentUser }) => setUser(currentUser)).catch(() => {
			setUser(null);
			setToken(null);
		}).finally(() => setAuthReady(true));
		else setAuthReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") localStorage.setItem("shopez_user", JSON.stringify(user));
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") localStorage.setItem("shopez_token", JSON.stringify(token));
	}, [token]);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") localStorage.setItem("shopez_currency", JSON.stringify(currency));
	}, [currency]);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") localStorage.setItem("shopez_cart", JSON.stringify(cart));
	}, [cart]);
	const value = {
		user,
		token,
		authReady,
		login: async (email, password, name) => {
			const data = name ? await registerUser(name, email, password) : await loginUser(email, password);
			setUser(data.user);
			setToken(data.token);
		},
		signup: async (name, email, password) => {
			const data = await registerUser(name, email, password);
			setUser(data.user);
			setToken(data.token);
		},
		logout: () => {
			setUser(null);
			setToken(null);
		},
		currency,
		setCurrency: setCurrencyState,
		cart,
		addToCart: (id) => setCart((c) => {
			return c.find((i) => i.id === id) ? c.map((i) => i.id === id ? {
				...i,
				qty: i.qty + 1
			} : i) : [...c, {
				id,
				qty: 1
			}];
		}),
		removeFromCart: (id) => setCart((c) => c.filter((i) => i.id !== id)),
		clearCart: () => setCart([])
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
var useStore = () => {
	const v = (0, import_react.useContext)(Ctx);
	if (!v) throw new Error("useStore must be inside StoreProvider");
	return v;
};
//#endregion
export { useStore as i, fetchProductById as n, fetchProducts as r, StoreProvider as t };
