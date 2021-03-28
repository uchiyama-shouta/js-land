import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SwipeableDrawer } from "@material-ui/core";

import DrawerList from "../templates/layout/DrawerList";
import { useContext } from "react";
import { AuthContext } from "../../src/auth/AuthProvider";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			marginBottom: 10,
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

const Header = (props) => {
	const classes = useStyles();
	const { state, setState } = props;
	const toggleDrawer = (anchor: Anchor, open: boolean) => (e) => {
		if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const { currentUser } = useContext(AuthContext);

	console.log(!!currentUser);

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
							<a>Logo</a>
						</Link>
					</Typography>
					{currentUser ? null : (
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
			<SwipeableDrawer
				anchor="left"
				open={state.left}
				onClose={toggleDrawer("left", false)}
				onOpen={toggleDrawer("left", true)}
			>
				<DrawerList />
			</SwipeableDrawer>
		</div>
	);
};

export default Header;
