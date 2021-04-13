import { memo, VFC } from "react";
import Link from "next/link";
import { BlogContentDatatype } from "../../../types/blog/blogContentDataType";

type Props = {
	blog: BlogContentDatatype;
};

const Article: VFC<Props> = memo((props) => {
	const { blog } = props;
	return (
		<article className="">
			<h2>
				<Link href={`/blog/${blog.id}`}>
					<a>{blog.title}</a>
				</Link>
			</h2>
			<div>
				<span>{blog.publishedAt.slice(0, 10).replace(/-/g, "/")}</span>
			</div>
		</article>
	);
});

export default Article;
