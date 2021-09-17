import { VFC } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogContentDatatype } from "../../../types/blog/blogContentDataType";

type Props = {
	blog: BlogContentDatatype;
};

const Article: VFC<Props> = ({ blog }) => {
	return (
		<article className="mx-auto transition-opacity max-w-[325px] min-w-[290px] max-h-[350] min-h-[280px]  rounded overflow-hidden shadow">
			<Link href={`/blog/${blog.id}`}>
				<a className="inline-block h-full w-full">
					<Image
						src={
							blog.thumbnail ? blog.thumbnail.url : "/image/lesson-image.jpg"
						}
						width={325}
						height={170}
						quality={60}
						alt="サムネイル画像"
					/>
					<div className="px-8 py-5 h-full min-h-[116px]">
						<h2 className="font-bold text-lg">{blog.title}</h2>
						<span>{blog.updatedAt}</span>
					</div>
				</a>
			</Link>
		</article>
	);
};

export default Article;
