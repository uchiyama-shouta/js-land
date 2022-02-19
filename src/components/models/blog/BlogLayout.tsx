import type { ReactNode, VFC } from "react";
import Head from "next/head";
import BlogAside from "src/components/models/blog/BlogAside";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const BlogLayout: VFC<Props> = (props) => {
  const { children, title, description } = props;
  const siteTitle = "JS-land";
  <Head>
    <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
    <meta name="description" content={description} />
  </Head>;
  return (
    <div className="block my-12 mx-auto w-11/12 sm:flex sm:w-11/12">
      <main className="w-full sm:mx-auto sm:w-[55%]">{children}</main>
      <BlogAside />
    </div>
  );
};

export default BlogLayout;
