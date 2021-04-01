import { memo, VFC } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { LessonDataType } from "../../../types/lesson/lessonType";
import LessonCard from "../../organisms/LessonCard";

type Props = {
	data: LessonDataType[];
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "90%",
			margin: "0 auto",
			flexGrow: 1,
		},
		card: {
			padding: theme.spacing(5),
			textAlign: "center",
			color: theme.palette.text.secondary,
		},
	})
);

const max = 10;

const LessonCardList: VFC<Props> = memo((props) => {
	const classes = useStyles();
	const { data } = props;
	return (
		<>
			<div className={classes.root}>
				<Grid container justify="center" spacing={4}>
					{data.slice(0, max).map((data) => (
						<Grid item xs key={data.id}>
							<LessonCard
								className={classes.card}
								thumbnailPath={data.thumbnailPath}
								title={data.title}
								copy={data.copy}
								price={data.price}
                        id={data.id}
							/>
						</Grid>
					))}
				</Grid>
			</div>
		</>
	);
});

export default LessonCardList;
