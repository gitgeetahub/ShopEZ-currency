import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as useStore, r as fetchProducts } from "./store-DCEFEH3c.mjs";
import { n as formatPrice } from "./products-CsLt0bkg.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as StarRating } from "./StarRating-BNOiy0Tt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DuMuC9ps.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const { currency, addToCart } = useStore();
	const [products, setProducts] = (0, import_react.useState)([]);
	const [category, setCategory] = (0, import_react.useState)("All");
	const [sort, setSort] = (0, import_react.useState)("featured");
	const [maxPrice, setMaxPrice] = (0, import_react.useState)(2e4);
	const [ratingMin, setRatingMin] = (0, import_react.useState)(0);
	const [ratingMax, setRatingMax] = (0, import_react.useState)(5);
	const [query, setQuery] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		fetchProducts().then((data) => {
			if (!active) return;
			setProducts(data);
			setLoading(false);
		}).catch(() => {
			if (!active) return;
			setError("Unable to load products from the backend.");
			setLoading(false);
		});
		return () => {
			active = false;
		};
	}, []);
	const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
	const filtered = (0, import_react.useMemo)(() => {
		let list = products.filter((p) => (category === "All" || p.category === category) && p.priceINR <= maxPrice && p.rating >= ratingMin && p.rating <= ratingMax && p.name.toLowerCase().includes(query.toLowerCase()));
		if (sort === "price-asc") list = [...list].sort((a, b) => a.priceINR - b.priceINR);
		if (sort === "price-desc") list = [...list].sort((a, b) => b.priceINR - a.priceINR);
		if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
		return list;
	}, [
		products,
		category,
		sort,
		maxPrice,
		ratingMin,
		ratingMax,
		query
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-7xl px-4 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-8 rounded-2xl bg-gradient-to-r from-primary to-primary/70 p-8 text-primary-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold sm:text-4xl",
				children: "Effortless shopping starts here"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-primary-foreground/90",
				children: "Browse thousands of products, compare prices in your currency, and enjoy secure checkout."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[260px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-6 rounded-lg border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1 block text-sm font-medium",
						children: "Search"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search products…",
						className: "w-full rounded-md border bg-background px-3 py-1.5 text-sm"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 text-sm font-semibold",
						children: "Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-1",
						children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setCategory(c),
							className: `rounded px-2 py-1 text-left text-sm ${category === c ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`,
							children: c
						}, c))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-sm font-semibold",
							children: "Max Price (INR)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 300,
							max: 2e4,
							step: 100,
							value: maxPrice,
							onChange: (e) => setMaxPrice(Number(e.target.value)),
							className: "w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: ["Up to ₹", maxPrice.toLocaleString()]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-sm font-semibold",
							children: "Rating"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-1",
							children: [
								[
									0,
									5,
									"All ratings"
								],
								[
									3,
									5,
									"3★ – 5★"
								],
								[
									4,
									5,
									"4★ – 5★"
								],
								[
									4.5,
									5,
									"4.5★ – 5★"
								]
							].map(([mn, mx, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setRatingMin(mn);
									setRatingMax(mx);
								},
								className: `rounded px-2 py-1 text-left text-sm ${ratingMin === mn && ratingMax === mx ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`,
								children: label
							}, label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								"Showing ",
								ratingMin,
								"★ – ",
								ratingMax,
								"★"
							]
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [filtered.length, " products"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: sort,
					onChange: (e) => setSort(e.target.value),
					className: "rounded-md border bg-background px-3 py-1.5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "featured",
							children: "Featured"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "price-asc",
							children: "Price: Low to High"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "price-desc",
							children: "Price: High to Low"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "rating",
							children: "Top Rated"
						})
					]
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border bg-card p-10 text-center text-muted-foreground",
				children: "Loading products..."
			}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border bg-card p-10 text-center text-muted-foreground",
				children: error
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border bg-card p-10 text-center text-muted-foreground",
				children: "No products match your filters."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "group flex flex-col overflow-hidden rounded-lg border bg-card transition hover:shadow-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$id",
						params: { id: p.id },
						className: "block overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.image,
							alt: p.name,
							loading: "lazy",
							className: "h-48 w-full object-cover transition group-hover:scale-105"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col gap-2 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase text-muted-foreground",
								children: p.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/product/$id",
								params: { id: p.id },
								className: "font-semibold hover:text-primary",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRating, { value: p.rating }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-auto flex items-end justify-between gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-bold",
									children: formatPrice(p.priceINR * (1 - p.discount / 100), currency)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground line-through",
									children: formatPrice(p.priceINR, currency)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800",
									children: [
										"-",
										p.discount,
										"%"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => addToCart(p.id),
								className: "mt-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
								children: "Add to Cart"
							})
						]
					})]
				}, p.id))
			})] })]
		})]
	});
}
//#endregion
export { Index as component };
