const plugin = require("tailwindcss/plugin");

module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			const newUtilities = {
				".bg-sky-blue": {
					backgroundColor: "rgba(40, 180, 255, 0.6)",
				},
				".translate-center": {
					transform: "translate(-50%, -50%)",
				},
				".w-screen-2rem": {
					width: "calc(100% - 2rem)",
				},
				".w-55%": {
					width: "55%",
				},
			};

			addUtilities(newUtilities);
		}),
	],
};
