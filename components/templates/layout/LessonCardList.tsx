import React, { memo, VFC } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { LessonDataType } from "../../../types/lesson/lessonType";
import LessonCard from "../../organisms/LessonCard";
import { useRecoilValue } from "recoil";
import { userState } from "../../../src/store/userState";

type Props = {
	data: LessonDataType[];
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "90%",
			maxWidth: 1100,
			[theme.breakpoints.down("md")]: {
				maxWidth: 720,
			},
			margin: "0 auto",
			flexGrow: 1,
		},
		flex: {
			[theme.breakpoints.down("xs")]: {
				display: "block",
			},
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
	const user = useRecoilValue(userState);

	console.log(data)
	return (
		<>
			<div className={classes.root}>
				<Grid container justify="center" alignItems="center">
					<Grid className={classes.flex} container spacing={4}>
						{data.length ? (
							data.slice(0, max).map((data) => (
								<React.Fragment key={data.id}>
									{user.role === "administrator" ? (
										<Grid item key={data.id}>
											<LessonCard
												className={classes.card}
												thumbnailPath={data.thumbnailPath}
												title={data.title}
												description={data.description}
												price={data.price}
												id={data.id}
											/>
										</Grid>
									) : (
										<>
											{data.isRelease ? (
												<Grid item key={data.id}>
													<LessonCard
														className={classes.card}
														thumbnailPath={data.thumbnailPath}
														title={data.title}
														description={data.description}
														price={data.price}
														id={data.id}
													/>
												</Grid>
											) : null}
										</>
									)}
								</React.Fragment>
							))
						) : (
							<p>comming soon...</p>
						)}
					</Grid>
				</Grid>
			</div>
			<style jsx>{`
				p {
					text-align: center;
					margin: 0 auto;
					font-size: 20px;
					line-height: 10;
				}
			`}</style>
		</>
	);
});

export default LessonCardList;
