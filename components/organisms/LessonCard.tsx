import React, { memo, VFC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { replaceToBr } from "../../lib/function/replaceToBr";
import { LessonDataType } from "../../types/lesson/lessonType";
import { useRecoilValue } from "recoil";
import { userState } from "../../src/store/userState";

const useStyles = makeStyles({
	root: {
		maxWidth: 325,
		maxHeight: 400,
		minWidth: 290,
		minHeight: 320,
		margin: "0 auto",
		transition: "opacity 0.3s",
		position: "relative",
	},
	pb10: {
		paddingTop: 10,
		"&:last-child": {
			paddingBottom: 10,
		},
	},
});
type Props = LessonDataType & { className?: any };

const LessonCard: VFC<Props> = memo((props) => {
	const { thumbnailPath, title, description, price, id } = props;
	const user = useRecoilValue(userState);
	const classes = useStyles();
	const router = useRouter();
	const pathName = `/edit/${id}`;
	return (
		<>
			<Card className={classes.root}>
				<Link href={`/lesson/${id}`}>
					<a>
						<Image
							src={thumbnailPath}
							width={325}
							height={170}
							alt="レッスンの画像"
						/>
						<CardActionArea>
							<CardContent className={classes.pb10}>
								<h2 className="mb-2 text-2xl">{title}</h2>
								<p className="h-16 text-black overflow-hidden overflow-ellipsis">
									{replaceToBr(description)}
								</p>
								<hr className="h-px my-2 mx-0 bg-gray-300 border-none flex-shrink-0" />
								<p className="text-xl pb-0">{price.toLocaleString()}円</p>
							</CardContent>
						</CardActionArea>
					</a>
				</Link>
				{user.role === "administrator" && (
					<div
						className="absolute top-3 right-3 w-9 h-9 pt-1 pl-2 bg-white rounded-full"
						onClick={() => router.push(pathName)}
					>
						<ArrowForwardIosIcon className="h-6 w-6" />
					</div>
				)}
			</Card>
		</>
	);
});

export default LessonCard;
