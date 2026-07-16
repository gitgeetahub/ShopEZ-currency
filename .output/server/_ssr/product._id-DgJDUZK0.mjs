import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as useStore } from "./store-DCEFEH3c.mjs";
import { n as formatPrice } from "./products-CsLt0bkg.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./product._id-BaI84HC1.mjs";
import { t as StarRating } from "./StarRating-BNOiy0Tt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-DgJDUZK0.js
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { product } = Route.useLoaderData();
	const { currency, addToCart } = useStore();
	const discounted = product.priceINR * (1 - product.discount / 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: product.image,
			alt: product.name,
			className: "w-full rounded-lg border object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase text-muted-foreground",
				children: product.category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-bold",
				children: product.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRating, {
					value: product.rating,
					size: 18
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [product.reviews, " customer reviews"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-baseline gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-3xl font-bold",
						children: formatPrice(discounted, currency)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground line-through",
						children: formatPrice(product.priceINR, currency)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-800",
						children: [
							"-",
							product.discount,
							"% OFF"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-muted-foreground",
				children: product.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 text-sm",
				children: ["Sold by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: product.seller
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => addToCart(product.id),
					className: "rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90",
					children: "Add to Cart"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cart",
					className: "rounded-md border px-6 py-3 font-semibold hover:bg-accent",
					children: "Go to Cart"
				})]
			})
		] })]
	});
}
//#endregion
export { ProductPage as component };
