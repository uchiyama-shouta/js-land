import Page from ".";
import { GetStaticProps } from "next";
import { BlogDataType } from "../types/blog/blogDataType";
import { client } from "../lib/microCMS";

export default Page;

export const getStaticProps: GetStaticProps = async () => {
	const res = await client.get<BlogDataType>({
		endpoint: "blog-js",
	});
	const data = res.contents.map((data) => {
		const { createdAt, updatedAt, revisedAt, publishedAt } = data;
		return {
			...data,
			createdAt: createdAt.slice(0, 10).replace(/-/g, "/"),
			publishedAt: publishedAt.slice(0, 10).replace(/-/g, "/"),
			revisedAt: revisedAt.slice(0, 10).replace(/-/g, "/"),
			updatedAt: updatedAt.slice(0, 10).replace(/-/g, "/"),
		};
	});

	return {
		props: {
			data,
		},
		revalidate: 10,
	};
};
