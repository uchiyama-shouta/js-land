import { ReactNode, VFC } from "react";
import Head from "next/head";
import BlogAside from "../../organisms/BlogAside";

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
		<div className="sm:flex w-11/12 block sm:w-11/12 mx-auto my-12">
			<main className="sm:w-[55%] w-full sm:mx-auto">{children}</main>
			<BlogAside />
		</div>
	);
};

export default BlogLayout;
