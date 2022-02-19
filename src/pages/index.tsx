import type { GetStaticProps, NextPage } from "next";

import type { BlogDataType } from "src/types/blog/blogDataType";

import Layout from "src/components/ui/Layout";
import BlogLayout from "src/components/models/blog/BlogLayout";
import ArticleGrid from "src/components/models/blog/ArticleGrid";
import { client } from "src/lib/microCMS";
import { formatDate } from "src/utils/formatDate";

type Props = {
  data: {
    id: string;
    updatedAt: string;
    title: string;
    thumbnail: string;
  }[];
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
    queries: { fields: "id,updatedAt,title,thumbnail" },
  });

  const processData = data.contents.map((data) => {
    return {
      id: data.id,
      updatedAt: formatDate(data.updatedAt),
      title: data.title,
      thumbnail: data.thumbnail
        ? data.thumbnail.url
        : "/image/lesson-image.jpg",
    };
  });

  return {
    props: {
      data: processData,
    },
    revalidate: 10,
  };
};

export default Home;
