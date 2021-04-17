import React, { memo, VFC } from "react";
import Image from "next/image";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
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
	icon: {
		position: "absolute",
		top: 10,
		right: 10,
		height: 25,
		width: 25,
	},
});
type Props = LessonDataType & { className?: any };

const LessonCard: VFC<Props> = memo((props) => {
	const { thumbnailPath, title, description, price, id } = props;
	const user = useRecoilValue(userState);
	const classes = useStyles();
	return (
		<>
			<Card className={classes.root}>
				<Link href={`/lesson/${id}`}>
					<a>
						<Image
							className={classes.media}
							src={thumbnailPath}
							width={325}
							height={170}
							alt="レッスンの画像"
						/>
						<CardActionArea>
							<CardContent className={classes.pb10}>
								<Typography gutterBottom variant="h5" component="h2">
									{title}
								</Typography>
								<Typography variant="body2" color="initial" component="p">
									{replaceToBr(description)}
								</Typography>
								<Divider className={classes.divider} />
								<Typography
									className={classes.price}
									variant="body2"
									color="initial"
									component="p"
								>
									{price.toLocaleString() + "円"}
								</Typography>
							</CardContent>
						</CardActionArea>
					</a>
				</Link>
				{user.role === "administrator" && (
					<Link href={`/edit/${id}`}>
						<a>
							<ArrowForwardIosIcon className={classes.icon} />
						</a>
					</Link>
				)}
			</Card>
		</>
	);
});

export default LessonCard;
