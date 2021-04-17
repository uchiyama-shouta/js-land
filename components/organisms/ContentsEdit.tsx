import { Dispatch, memo, SetStateAction, useEffect, VFC } from "react";

type Props = {
	contents: any[];
	setContents: Dispatch<SetStateAction<any>>;
};

const ContentsEdit: VFC<Props> = (props) => {
	const { contents, setContents } = props;
	useEffect(() => {
		console.log(props.contents);
		console.log(contents);
		console.log("render!!!");
		setContents([{ type: "text" }]);
	}, []);
	return <div>EDIT</div>;
};

export default ContentsEdit;
