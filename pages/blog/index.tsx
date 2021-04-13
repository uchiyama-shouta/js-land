import { GetStaticProps } from "next";
import { VFC } from "react";
import Article from "../../components/molecules/blog/Article";
import Layout from "../../components/templates/layout/Layout";
import { BlogContentDatatype } from "../../types/blog/blogContentDataType";
import { BlogDataType } from "../../types/blog/blogDataType";

type Props = {
	data: BlogContentDatatype[];
};

const index: VFC<Props> = (props) => {
	const { data } = props;

	return (
		<Layout description="ブログの記事一覧ページです。">
			{data.map((data: BlogContentDatatype) => (
				<Article key={data.id} blog={data} />
			))}
		</Layout>
	);
};

export default index;

export const getStaticProps: GetStaticProps = async () => {
	const key = {
		headers: { "X-API-KEY": process.env.NEXT_PUBLIC_BLOG_APIKEY },
	};
	const res = await fetch("https://shou-blog.microcms.io/api/v1/blog-js", key);
	const data: BlogDataType = await res.json();

	return {
		props: {
			data: data.contents,
		},
	};
};
