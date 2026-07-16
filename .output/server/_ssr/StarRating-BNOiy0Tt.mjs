import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as Star } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StarRating-BNOiy0Tt.js
var import_jsx_runtime = require_jsx_runtime();
function StarRating({ value, size = 14 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex items-center gap-0.5",
		"aria-label": `Rating ${value}`,
		children: [[
			1,
			2,
			3,
			4,
			5
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
			width: size,
			height: size,
			className: i <= Math.round(value) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
		}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-1 text-xs text-muted-foreground",
			children: value.toFixed(1)
		})]
	});
}
//#endregion
export { StarRating as t };
