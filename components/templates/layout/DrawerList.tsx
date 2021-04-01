import React, { memo, VFC } from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider } from "@material-ui/core";
import { auth } from "../../../src/firebase";
import { useRouter } from "next/router";
import { initialState, userState } from "../../../src/store/userState";
import { UserStateType } from "../../../types/user/UserStateType";

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

const DrawerList: VFC<Props> = memo((props) => {
	const [user, setUser] = useRecoilState<UserStateType>(userState);
	const classes = useStyles();
	const { anchor } = props;
	const router = useRouter();

	const logOut = async () => {
		try {
			await auth.signOut();
			setUser(initialState);
			router.push("/login");
		} catch (error) {
			alert(error.message);
		}
	};
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
				<Divider />
				{user.isSignedIn && (
					<>
						<ListItem button>
							<ListItemText primary="ログアウト" onClick={logOut} />
						</ListItem>
						{user.role === "administrator" && (
							<ListItem>
								<Link href="/edit">
									<a>
										<ListItemText primary="編集" />
									</a>
								</Link>
							</ListItem>
						)}
					</>
				)}
			</List>
		</div>
	);
});

export default DrawerList;
