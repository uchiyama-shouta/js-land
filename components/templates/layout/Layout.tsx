import { memo, ReactNode, useState, VFC } from "react";
import Header from "../../organisms/Header";

type Props = {
	children: ReactNode;
};

const Layout: VFC<Props> = memo(({ children }) => {
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	console.log(state);

	return (
		<>
			<Header state={state} setState={setState} />
			<div>{children}</div>
			<style jsx>{`
				div {
					padding-top: 65px;
				}
			`}</style>
		</>
	);
});

export default Layout;
