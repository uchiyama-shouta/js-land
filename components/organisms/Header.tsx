import { Dispatch, memo, SetStateAction, VFC } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";

import DrawerList from "../templates/layout/DrawerList";
import { userState } from "../../src/store/userState";
import { UserStateType } from "../../types/user/UserStateType";
import Logo from "../atom/Logo";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			backgroundColor: "#fff",
		},
		menuButton: {
			marginRight: theme.spacing(2),
			"&:focus": {
				outline: "none",
			},
		},
	})
);

type Anchor = "top" | "left" | "bottom" | "right";

type stateType = {
	top: boolean;
	left: boolean;
	bottom: boolean;
	right: boolean;
};

type Props = {
	state: stateType;
	setState: Dispatch<SetStateAction<stateType>>;
};

const Header: VFC<Props> = memo((props) => {
	const classes = useStyles();
	const { state, setState } = props;
	const user = useRecoilValue<UserStateType>(userState);
	const toggleDrawer = (anchor: Anchor, open: boolean) => (e) => {
		if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	return (
		<div className="flex-grow">
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						className={classes.menuButton}
						edge="start"
						color="default"
						aria-label="menu"
						onClick={toggleDrawer("left", true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className="flex-grow" color="textPrimary">
						<Logo />
					</Typography>
					{user.isSignedIn ? null : (
						<>
							<Button color="default" className={classes.menuButton}>
								<Link href="/login">
									<a>ログイン</a>
								</Link>
							</Button>
							<Button color="default" className={classes.menuButton}>
								<Link href="/signUp">
									<a>新規登録</a>
								</Link>
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
			<Drawer
				anchor="left"
				open={state.left}
				onClose={toggleDrawer("left", false)}
			>
				<DrawerList />
			</Drawer>
		</div>
	);
});

export default Header;
