import { memo, VFC } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogContentDatatype } from "../../../types/blog/blogContentDataType";

import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";

type Props = {
	blog: BlogContentDatatype;
};

const useStyles = makeStyles({
	root: {
		maxWidth: 325,
		maxHeight: 350,
		minWidth: 290,
		minHeight: 280,
		margin: "0 auto",
		transition: "opacity 0.3s",
	},
	media: {
		height: 170,
	},
	divider: {
		margin: "10px 0",
	},
	price: {
		fontSize: 20,
		paddingBottom: 0,
	},
});

const Article: VFC<Props> = memo((props) => {
	const { blog } = props;
	const classes = useStyles();
	return (
		<article>
			<Card className={classes.root}>
				<Link href={`/blog/${blog.id}`}>
					<a className="inline-block h-full w-full">
						<Image
							className={classes.media}
							src={
								blog.thumbnail ? blog.thumbnail.url : "/image/lesson-image.jpg"
							}
							width={325}
							height={170}
							quality={60}
							alt="サムネイル画像"
						/>
						<div>
							<div className="px-8 py-5">
								<h2 className="font-bold text-lg">{blog.title}</h2>
								<span>{blog.publishedAt.slice(0, 10).replace(/-/g, "/")}</span>
							</div>
						</div>
					</a>
				</Link>
			</Card>
		</article>
	);
});

export default Article;
