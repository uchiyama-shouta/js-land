import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

import Layout from "src/components/ui/Layout";
import BlogLayout from "src/components/models/blog/BlogLayout";

import type { BlogContentDatatype } from "src/types/blog/blogContentDataType";
import type { BlogDataType } from "src/types/blog/blogDataType";

import { createDescription } from "src/utils/createDescription";
import { client, sampleThumbnailPath } from "src/lib/microCMS";

type Props = {
  data: BlogContentDatatype;
  body: string;
  description: string;
};

const Post: NextPage<Props> = ({ data, body, description }) => {
  const { id, title, updatedAt } = data;

  const thumbnailPath = data.thumbnail
    ? data.thumbnail.url
    : sampleThumbnailPath;
  return (
    <Layout title={title} description={description}>
      <Head>
        <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
          <meta property="og:title" content={title} />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`https://learning-service.vercel.app/blog/${id}`}
          />
          <meta property="og:image" content={thumbnailPath} />
          <meta property="og:site_name" content="JS-land" />
          <meta property="og:description" content={description} />
          <meta name="twitter:card" content="summary" />
        </head>
      </Head>
      <BlogLayout>
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="mb-7">
          <span className="ml-1">{updatedAt}</span>
        </div>
        <div
          id="blog-post-body"
          className="mb-16"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <Link href="/">
          <a className="text-black hover:underline">一覧ページに戻る</a>
        </Link>
      </BlogLayout>
    </Layout>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.slug;

  const data = await client.get<BlogContentDatatype>({
    endpoint: `blog-js/${id}`,
  });

  const $ = cheerio.load(data.content);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  const description = `${data.title} | ${createDescription(data.content)}`;

  return {
    props: {
      data: data,
      body: $.html(),
      description,
    },
    revalidate: 10,
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
