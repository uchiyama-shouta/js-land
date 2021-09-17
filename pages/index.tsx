import { VFC } from "react";
import { GetStaticProps } from "next";
import BlogLayout from "../components/templates/layout/BlogLayout";
import { BlogDataType } from "../types/blog/blogDataType";
import { BlogContentDatatype } from "../types/blog/blogContentDataType";
import Layout from "../components/templates/layout/Layout";
import ArticleGrid from "../components/templates/layout/ArticleGrid";
import { client } from "../lib/microCMS";

type Props = {
	data: BlogContentDatatype[];
};

const Home: VFC<Props> = ({ data }) => {
	return (
		<Layout description="ブログの記事一覧ページです。">
			<BlogLayout>
				<ArticleGrid blog={data} />
			</BlogLayout>
		</Layout>
	);
};

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

export default Home;
