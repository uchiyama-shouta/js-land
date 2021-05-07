import { VFC } from "react";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

import Layout from "../../components/templates/layout/Layout";
import { BlogContentDatatype } from "../../types/blog/blogContentDataType";
import { BlogDataType } from "../../types/blog/blogDataType";
import BlogLayout from "../../components/templates/layout/BlogLayout";
import { createDescription } from "../../lib/function/createDescription";

type Props = {
	data: BlogContentDatatype;
	body: any;
};

const Post: VFC<Props> = (props) => {
	const { data, body } = props;
	const description = `${data.title} | ${createDescription(
		data.content.slice(0, 80)
	)}...`;
	return (
		<>
			<Head>
				<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
					<meta property="og:title" content={data.title} />
					<meta property="og:type" content="article" />
					<meta property="og:url" content={`https://learning-service.vercel.app/blog/${data.id}`} />
					<meta property="og:image" content={data.thumbnail.url} />
					<meta property="og:site_name" content="JS-land" />
					<meta
						property="og:description"
						content={description}
					/>
					<meta name="twitter:card" content="summary" />
				</head>
			</Head>
			<Layout title={data.title} description={description}>
				<BlogLayout>
					<h1 className="title">{data.title}</h1>
					<div className="post-meta">
						<span>{data.publishedAt.slice(0, 10).replace(/-/g, "/")}</span>
					</div>
					<div
						className="blog-post-body"
						dangerouslySetInnerHTML={{ __html: body }}
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
		</>
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
	const $ = cheerio.load(data.content);
	$("pre code").each((_, elm) => {
		const result = hljs.highlightAuto($(elm).text());
		$(elm).html(result.value);
		$(elm).addClass("hljs");
	});
	return {
		props: {
			data,
			body: $.html(),
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
