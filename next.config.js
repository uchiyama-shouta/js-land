const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withPWA({
	pwa: {
		dest: "public",
		runtimeCaching,
	},
});

module.exports = withBundleAnalyzer({
	images: {
		domains: ["images.microcms-assets.io", "firebasestorage.googleapis.com"],
	},
});
