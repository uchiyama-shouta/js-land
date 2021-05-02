import { memo, useCallback, useEffect, useState, VFC } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateIcon from "@material-ui/icons/Create";
import { LessonChapterType } from "../../types/lesson/lessonChapterType";
import { LessonContentType } from "../../types/lesson/lessonContentType";
import Divider from "@material-ui/core/Divider";

import PrimaryButton from "../atom/button/PrimaryButton";
import CreateChapter from "../molecules/lesson/CreateChapter";
import CreateLesson from "../molecules/lesson/CreateLesson";

type Props = {
	contents: LessonChapterType[];
	setContents: React.Dispatch<React.SetStateAction<any>>;
};

const useStyles = makeStyles({
	select: {
		minWidth: 120,
	},
	icon: {
		color: "#1976d2",
		backgroundColor: "'#fff",
		width: 40,
		height: 40,
		"&:not(:last-child)": {
			marginRight: 10,
		},
	},
});

const ContentsEdit: VFC<Props> = memo((props) => {
	const classes = useStyles();
	const { contents, setContents } = props;
	const [createFlag, setCreateFlag] = useState(false);
	const [editFlag, setEditFlag] = useState(false);
	const [type, setType] = useState<"text" | "video" | "">("");

	const onClickSetCreateFlag = () => {
		setCreateFlag(true);
		setEditFlag(false);
	};
	const onClickSetEditFlag = () => {
		setEditFlag(true);
		setCreateFlag(false);
	};

	const [chapterName, setChapterName] = useState("");
	const onChangeChapterName = useCallback(
		(e) => {
			setChapterName(e.target.value);
		},
		[setChapterName]
	);

	const onClickEdit = () => {
		setContents([...contents, { chapterName, lessons: { type } }]);
	};

	useEffect(() => {
		console.log(contents);
		console.log(type);
	}, [contents, type]);

	return (
		<>
			<div className="wrapper">
				<Divider />
				<h2>内容の編集</h2>
				{createFlag || editFlag ? (
					<>
						{createFlag && (
							<CreateChapter
								chapterName={chapterName}
								onChangeChapterName={onChangeChapterName}
								onClickEdit={onClickEdit}
							/>
						)}
						{editFlag && (
							<CreateLesson
								chapterName={chapterName}
								onChangeChapterName={onChangeChapterName}
								contents={contents}
							/>
						)}
						<div className="spacer" />
					</>
				) : null}
				<div />
				<AddCircleIcon
					className={classes.icon}
					onClick={onClickSetCreateFlag}
				/>
				<CreateIcon className={classes.icon} onClick={onClickSetEditFlag} />
				<Divider />
			</div>
			<style jsx>{`
				h2 {
					line-height: 70px;
				}
				.spacer {
					height: 30px;
				}
				.wrapper {
					width: 100%;
					padding: 30px 0;
				}
			`}</style>
		</>
	);
});

export default ContentsEdit;
