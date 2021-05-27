import { memo, VFC } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { BlogContentDatatype } from "../../../types/blog/blogContentDataType";
import Article from "../../molecules/blog/Article";

type Props = {
	blog: BlogContentDatatype[];
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		flex: {
			[theme.breakpoints.down("md")]: {
				display: "block",
			},
		},
	})
);

// const max = 10;

const ArticleGrid: VFC<Props> = memo((props) => {
	const classes = useStyles();
	const { blog } = props;
	return (
		<>
			<div className="flex-grow w-full md:max-w-4xl max-w-2xl mx-auto">
				<Grid container justify="center" alignItems="center">
					<Grid className={classes.flex} container spacing={4}>
						{blog.map((data) => (
							<Grid item key={data.id}>
								<Article key={data.id} blog={data} />
							</Grid>
						))}
					</Grid>
				</Grid>
			</div>
		</>
	);
});

export default ArticleGrid;
