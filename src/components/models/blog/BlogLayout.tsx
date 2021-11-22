import { ReactNode, VFC } from "react";
import Head from "next/head";
import BlogAside from "../../models/blog/BlogAside";

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
    <div className="block sm:flex my-12 mx-auto w-11/12 sm:w-11/12">
      <main className="sm:mx-auto w-full sm:w-[55%]">{children}</main>
      <BlogAside />
    </div>
  );
};

export default BlogLayout;
