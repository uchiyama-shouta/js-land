import { VFC } from "react";
import { useRouter } from "next/router";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

type Props = {
	pathName: string;
};

const ArrowLink: VFC<Props> = ({ pathName }) => {
	const router = useRouter();

	return (
		<div
			className="absolute top-3 right-3 w-9 h-9 pt-1 pl-2 bg-white rounded-full"
			onClick={() => router.push(pathName)}
		>
			<ArrowForwardIosIcon className="h-6 w-6" />
		</div>
	);
};

export default ArrowLink;
