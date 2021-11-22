import type { GetStaticProps, NextPage } from "next";

import type { BlogDataType } from "../types/blog/blogDataType";
import type { BlogContentDatatype } from "../types/blog/blogContentDataType";

import Layout from "../components/ui/Layout";
import ArticleGrid from "../components/models/blog/ArticleGrid";
import BlogLayout from "../components/models/blog/BlogLayout";
import { client } from "../lib/microCMS";

type Props = {
  data: BlogContentDatatype[];
};

const Home: NextPage<Props> = ({ data }) => {
  return (
    <Layout description="ブログの記事一覧ページです。">
      <BlogLayout>
        <ArticleGrid blog={data} />
      </BlogLayout>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get<BlogDataType>({
    endpoint: "blog-js",
  });

  return {
    props: {
      data: data.contents,
    },
    revalidate: 10,
  };
};

export default Home;
