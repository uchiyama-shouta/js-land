import { memo, VFC } from "react";
import Image from "next/image";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import { LessonDataType } from "../../types/lesson/lessonType";

const useStyles = makeStyles({
	root: {
		maxWidth: 350,
		maxHeight: 400,
		minWidth: 290,
		minHeight: 320,
		margin: "0 auto",
		transition: "opacity 0.3s",
		"&:hover": {
			opacity: 0.8,
		},
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
});
type Props = LessonDataType & { className?: any };

const LessonCard: VFC<Props> = memo((props) => {
	const { thumbnailPath, title, copy, price, id } = props;
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			{/* <Link href="/lesson/[id]" as={`/lesson/${id}`}> */}
			<Link href={`/lesson/${id}`}>
				<a>
					<div>
						<Image
							className={classes.media}
							src={thumbnailPath}
							width={350}
							height={170}
						/>
						<CardContent className={classes.pb10}>
							<Typography gutterBottom variant="h5" component="h2">
								{title}
							</Typography>
							<Typography variant="body2" color="initial" component="p">
								{copy}
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
					</div>
				</a>
			</Link>
		</Card>
	);
});

export default LessonCard;
