import { Dispatch, memo, SetStateAction, VFC } from "react";
import Link from "next/link";
import Image from "next/image";
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

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			// marginBottom: 10,
		},
		appBar: {
			backgroundColor: "#fff",
		},
		justify: {
			justifyContent: "space-between",
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
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
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.justify}>
					<IconButton
						className={classes.menuButton}
						edge="start"
						color="default"
						aria-label="menu"
						onClick={toggleDrawer("left", true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						className={classes.title}
						color="textPrimary"
					>
						<Link href="/">
							<a>
								<Image
									id="logo"
									width={95}
									height={15}
									alt="ロゴ"
									src="/image/logo_transparent.png"
								/>
							</a>
						</Link>
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
