import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/templates/layout/Layout";

const Post = () => {
	return (
		<Layout>
			<div></div>
		</Layout>
	);
};

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
	const id = context.params.slug;
	return {
		props: {},
	};
};
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: false,
	};
};
