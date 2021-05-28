import { memo, useState, VFC } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

import MenuIcon from "@material-ui/icons/Menu";

import Logo from "../atom/Logo";
import DrawerList from "../templates/layout/DrawerList";
import { userState } from "../../src/store/userState";
import { UserStateType } from "../../types/user/UserStateType";

const Drawer = dynamic(() => import("@material-ui/core/Drawer"));

const Header: VFC = memo(() => {
	const user = useRecoilValue<UserStateType>(userState);
	const [isOpen, setIsOpen] = useState(false);
	const toggleDrawer = (open: boolean) => {
		setIsOpen(open);
	};

	return (
		<div className="flex-grow">
			<header className="bg-white fixed top-0 left-auto right-0 w-full flex z-50 box-border flex-shrink-0 flex-col shadow-md">
				<div className="flex relative items-center px-4 sm:px-6 min-h-56 sm:min-h-64">
					<button
						className="mr-4 -ml-3 p-3 text-gray-500 focus:outline-none transition rounded-full hover:bg-gray-100"
						tabIndex={0}
						type="button"
						aria-label="menu"
						onClick={() => toggleDrawer(true)}
					>
						<MenuIcon />
					</button>
					<Logo />
					{!user.isSignedIn && (
						<>
							<button
								className="mr-4 p-2 focus:outline-none transition hover:bg-gray-100 rounded"
								tabIndex={0}
								type="button"
							>
								<Link href="/login">
									<a>ログイン</a>
								</Link>
							</button>
							<button
								className="mr-4 p-2 focus:outline-none transition hover:bg-gray-100 rounded"
								tabIndex={0}
								type="button"
							>
								<Link href="/signUp">
									<a>新規登録</a>
								</Link>
							</button>
						</>
					)}
				</div>
			</header>
			<Drawer anchor="left" open={isOpen} onClose={() => toggleDrawer(false)}>
				<DrawerList />
			</Drawer>
		</div>
	);
});

export default Header;
