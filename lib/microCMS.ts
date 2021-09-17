import { createClient } from "microcms-js-sdk";

export const client = createClient({
	serviceDomain: "shou-blog",
	apiKey: process.env.NEXT_PUBLIC_BLOG_APIKEY,
	globalDraftKey: "",
});

export const sampleThumbnailPath =
	"https://images.microcms-assets.io/assets/c9a1727417ca42caaeb447e362bfef6a/829615ee10f5486caa355eaab355234f/thumbnail_React_image.png";
