import { Dispatch, memo, SetStateAction, useEffect, VFC } from "react";
import { LessonDataType } from "../../types/lesson/lessonType";

type Props = {
	contents: LessonDataType | {};
	setContents: Dispatch<SetStateAction<any>>;
};

const ContentsEdit: VFC<Props> = memo((props) => {
	const { contents, setContents } = props;
	console.log(contents);
	return <div>EDIT</div>;
});

export default ContentsEdit;
