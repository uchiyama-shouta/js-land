import { ReactNode, VFC } from "react";
import Head from "next/head";
import Footer from "../../organisms/Footer";
import Header from "../../organisms/Header";

type Props = {
	children: ReactNode;
	title?: string;
	description?: string;
};

const Layout: VFC<Props> = (props) => {
	const siteTitle = "JS-land";
	const { children, title, description } = props;

	return (
		<div>
			<Head>
				<title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
				<meta name="description" content={description} />
			</Head>
			<Header />
			<div className="py-12">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
