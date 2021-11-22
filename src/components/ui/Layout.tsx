import type { ReactNode, VFC } from "react";
import Head from "next/head";
import Header from "src/components/ui/Header";
import Footer from "src/components/ui/Footer";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const Layout: VFC<Props> = (props) => {
  const siteTitle = "JS-land";
  const { children, title, description } = props;

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <div className="py-12">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
