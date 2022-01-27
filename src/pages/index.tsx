import type { GetStaticProps, NextPage } from "next";

import type { BlogDataType } from "src/types/blog/blogDataType";
import type { BlogContentDatatype } from "src/types/blog/blogContentDataType";

import Layout from "src/components/ui/Layout";
import BlogLayout from "src/components/models/blog/BlogLayout";
import ArticleGrid from "src/components/models/blog/ArticleGrid";
import { client } from "src/lib/microCMS";

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

  const processData = data.contents.map((data) => {
    const base = {
      id: data.id,
      updatedAt: data.updatedAt,
      title: data.title,
    };
    return data.thumbnail
      ? {
          ...base,
          thumbnail: data.thumbnail,
        }
      : base;
  });

  return {
    props: {
      data: processData,
    },
    revalidate: 10,
  };
};

export default Home;
