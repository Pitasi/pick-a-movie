module.exports = {
	content: ["./app/**/*.{ts,tsx,jsx,js}"],
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [require("@tailwindcss/line-clamp")],
};
