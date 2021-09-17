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
import { createDescription } from "../../lib/createDescription";
import { client, sampleThumbnailPath } from "../../lib/microCMS";

type Props = {
	data: BlogContentDatatype;
	body: any;
};

const Post: VFC<Props> = (props) => {
	const { data, body } = props;
	const description = `${data.title} | ${createDescription(data.content)}`;

	const thumbnailPath = data.thumbnail
		? data.thumbnail.url
		: sampleThumbnailPath;
	return (
		<Layout title={data.title} description={description}>
			<Head>
				<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
					<meta property="og:title" content={data.title} />
					<meta property="og:type" content="article" />
					<meta
						property="og:url"
						content={`https://learning-service.vercel.app/blog/${data.id}`}
					/>
					<meta property="og:image" content={thumbnailPath} />
					<meta property="og:site_name" content="JS-land" />
					<meta property="og:description" content={description} />
					<meta name="twitter:card" content="summary" />
				</head>
			</Head>
			<BlogLayout>
				<h1 className="text-3xl font-bold">{data.title}</h1>
				<div className="mb-7">
					<span className="ml-1">
						{data.updatedAt.slice(0, 10).replace(/-/g, "/")}
					</span>
				</div>
				<div
					id="blog-post-body"
					className="mb-16"
					dangerouslySetInnerHTML={{ __html: body }}
				/>
				<Link href="/blog">
					<a className="text-black hover:underline">一覧ページに戻る</a>
				</Link>
			</BlogLayout>
		</Layout>
	);
};

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
	const id = context.params.slug;

	const data = await client.get<BlogContentDatatype>({
		endpoint: `blog-js/${id}`,
	});
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
	const data = await client.get<BlogDataType>({
		endpoint: "blog-js",
	});

	const paths = data.contents.map((data) => `/blog/${data.id}`);
	return {
		paths,
		fallback: false,
	};
};
