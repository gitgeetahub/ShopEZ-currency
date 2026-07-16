import { n as fetchProductById } from "./store-DCEFEH3c.mjs";
import { f as lazyRouteComponent, j as notFound, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-BaI84HC1.js
var $$splitNotFoundComponentImporter = () => import("./product._id-4ql1m_E7.mjs");
var $$splitComponentImporter = () => import("./product._id-DgJDUZK0.mjs");
var Route = createFileRoute("/product/$id")({
	loader: async ({ params }) => {
		try {
			return { product: await fetchProductById(params.id) };
		} catch {
			throw notFound();
		}
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
