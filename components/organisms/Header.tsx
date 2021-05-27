import { Dispatch, memo, SetStateAction, VFC } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";

import DrawerList from "../templates/layout/DrawerList";
import Logo from "../atom/Logo";
import { userState } from "../../src/store/userState";
import { UserStateType } from "../../types/user/UserStateType";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		menuButton: {
			marginRight: theme.spacing(2),
			"&:focus": {
				outline: "none",
			},
		},
	})
);

type Props = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Header: VFC<Props> = memo((props) => {
	const classes = useStyles();
	const user = useRecoilValue<UserStateType>(userState);
	const { isOpen, setIsOpen } = props;
	const toggleDrawer = (open: boolean) => () => {
		setIsOpen(open);
	};

	return (
		<div className="flex-grow">
			<header className="bg-white fixed top-0 left-auto right-0 w-full flex z-50 box-border flex-shrink-0 flex-col shadow-md">
				<Toolbar>
					<IconButton
						className={classes.menuButton}
						edge="start"
						color="default"
						aria-label="menu"
						onClick={toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Logo />
					{!user.isSignedIn && (
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
			</header>
			<Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
				<DrawerList />
			</Drawer>
		</div>
	);
});

export default Header;
