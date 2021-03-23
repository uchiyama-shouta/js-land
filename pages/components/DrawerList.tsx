import React, { VFC } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
});

const testList = ["レッスン一覧", "購入したレッスン", "検索"];

type Props = {
	anchor?: "top" | "left" | "bottom" | "right";
};

const DrawerList: VFC<Props> = (props) => {
	const classes = useStyles();
	const { anchor } = props;
	return (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === "top" || anchor === "bottom",
			})}
			role="presentation"
		>
			<List>
				{testList.map((text) => (
					<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);
}

export default DrawerList