import Head from "next/head";
import { memo, ReactNode, useState, VFC } from "react";
import Footer from "../../organisms/Footer";
import Header from "../../organisms/Header";

type Props = {
	children: ReactNode;
	title?: string;
	description?: string;
};

const Layout: VFC<Props> = memo((props) => {
	const siteTitle = "JS-land";
	const { children, title, description } = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Head>
				<title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
				<meta name="description" content={description} />
			</Head>
			<Header isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className="h-12" />
			<>{children}</>
			<div className="h-12" />
			<Footer />
		</>
	);
});

export default Layout;
