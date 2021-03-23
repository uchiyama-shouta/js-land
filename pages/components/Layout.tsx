import { ReactNode, useState, VFC } from "react";
import Header from "./Header";

type Props = {
	children: ReactNode;
};

const Layout: VFC<Props> = ({ children }) => {
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	return (
		<>
			<Header state={state} setState={setState} />
			<>{children}</>
		</>
	);
};

export default Layout;
