import { memo, useCallback, useState, VFC } from "react";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

import MenuIcon from "@material-ui/icons/Menu";

import Logo from "../atom/Logo";
import DrawerList from "../templates/layout/DrawerList";
import { userState } from "../../src/store/userState";
import { UserStateType } from "../../types/user/UserStateType";
import HeaderLinks from "../molecules/HeaderLinks";

const Header: VFC = memo(() => {
	const Drawer = dynamic(async () => await import("@material-ui/core/Drawer"));
	const user = useRecoilValue<UserStateType>(userState);
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = useCallback(
		(open: boolean) => {
			setIsOpen(open);
		},
		[isOpen],
	);

	return (
		<div className="flex-grow">
			<header className="bg-white fixed top-0 left-auto right-0 w-full flex z-50 box-border flex-shrink-0 flex-col shadow-md">
				<div className="flex relative items-center px-4 sm:px-6 sm:min-h-[64px] min-h-[56px]">
					<button
						className="mr-4 -ml-3 p-3 text-gray-500 focus:outline-none transition-colors rounded-full hover:bg-gray-100"
						tabIndex={0}
						type="button"
						aria-label="menu"
						onClick={() => toggleOpen(true)}
					>
						<MenuIcon />
					</button>
					<Logo />
					{!user.isSignedIn && <HeaderLinks />}
				</div>
			</header>
			<Drawer anchor="left" open={isOpen} onClose={() => toggleOpen(false)}>
				<DrawerList />
			</Drawer>
		</div>
	);
});

export default Header;
