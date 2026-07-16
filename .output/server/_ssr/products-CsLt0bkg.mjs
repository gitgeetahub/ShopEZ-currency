//#region node_modules/.nitro/vite/services/ssr/assets/products-CsLt0bkg.js
var currencies = {
	INR: {
		symbol: "₹",
		rate: 1,
		label: "Indian Rupee"
	},
	USD: {
		symbol: "$",
		rate: .012,
		label: "US Dollar"
	},
	EUR: {
		symbol: "€",
		rate: .011,
		label: "Euro"
	},
	GBP: {
		symbol: "£",
		rate: .0094,
		label: "British Pound"
	},
	AED: {
		symbol: "AED ",
		rate: .044,
		label: "UAE Dirham"
	},
	JPY: {
		symbol: "¥",
		rate: 1.87,
		label: "Japanese Yen"
	}
};
var formatPrice = (inr, code) => {
	const { symbol, rate } = currencies[code];
	return `${symbol}${(inr * rate).toLocaleString(void 0, { maximumFractionDigits: code === "JPY" || code === "INR" ? 0 : 2 })}`;
};
//#endregion
export { formatPrice as n, currencies as t };
