import { VFC } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";

import Layout from "../../components/templates/layout/Layout";
import { BlogContentDatatype } from "../../types/blog/blogContentDataType";
import { BlogDataType } from "../../types/blog/blogDataType";
import BlogLayout from "../../components/templates/layout/BlogLayout";

type Props = {
	data: BlogContentDatatype;
};

const Post: VFC<Props> = (props) => {
	const { data } = props;
	const description = `${data.title} | ${data.content.slice(0, 80)}...`;
	return (
		<Layout title={data.title} description={description}>
			<BlogLayout>
				<h1 className="title">{data.title}</h1>
				<div className="post-meta">
					<span>{data.publishedAt.slice(0, 10).replace(/-/g, "/")}</span>
				</div>
				<div
					className="blog-post-body"
					dangerouslySetInnerHTML={{ __html: data.content }}
				/>
				<Link href="/blog">
					<a>一覧ページに戻る</a>
				</Link>
			</BlogLayout>
			<style jsx>{`
				.title {
					font-size: 30px;
				}
				.post-meta {
					margin-bottom: 30px;
				}
				span {
					margin-left: 5px;
				}
				.blog-post-body {
					margin-bottom: 70px;
				}
			`}</style>
		</Layout>
	);
};

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
	const apiUrl = "https://shou-blog.microcms.io/api/v1/blog-js/";
	const key = {
		headers: { "X-API-KEY": process.env.NEXT_PUBLIC_BLOG_APIKEY },
	};
	const id = context.params.slug;
	const res = await fetch(apiUrl + id, key);
	const data: BlogContentDatatype = await res.json();
	return {
		props: {
			data,
		},
	};
};
export const getStaticPaths: GetStaticPaths = async () => {
	const apiUrl = "https://shou-blog.microcms.io/api/v1/blog-js";
	const key = {
		headers: { "X-API-KEY": process.env.NEXT_PUBLIC_BLOG_APIKEY },
	};
	const res = await fetch(apiUrl, key);
	const data: BlogDataType = await res.json();
	const paths = data.contents.map((data) => `/blog/${data.id}`);

	return {
		paths,
		fallback: false,
	};
};
