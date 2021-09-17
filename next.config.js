const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
	images: {
		domains: ["images.microcms-assets.io", "firebasestorage.googleapis.com"],
	},
});
