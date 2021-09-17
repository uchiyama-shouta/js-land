import { VFC } from "react";

import Logo from "../atom/Logo";

const Header: VFC = () => {
	return (
		<div className="flex-grow">
			<header className="bg-white fixed top-0 left-auto right-0 w-full flex z-50 box-border flex-shrink-0 flex-col shadow-md">
				<div className="flex relative items-center px-4 sm:px-6 sm:min-h-[64px] min-h-[56px] ml-5">
					<Logo />
				</div>
			</header>
		</div>
	);
};

export default Header;
