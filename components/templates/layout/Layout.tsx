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
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	return (
		<>
			<Head>
				<title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
				<meta name="description" content={description} />
			</Head>
			<Header state={state} setState={setState} />
			<div className="h-12" />
			<>{children}</>
			<div className="h-12" />
			<Footer />
			<style jsx>{`
				div {
					height: 64px;
				}
			`}</style>
		</>
	);
});

export default Layout;
