import { memo, useCallback, useState, VFC } from "react";
import { makeStyles } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import TextInput from "../../atom/TextInput";
import MenuItem from "@material-ui/core/MenuItem";
import PrimaryButton from "../../atom/button/PrimaryButton";
import { LessonChapterType } from "../../../types/lesson/lessonChapterType";

const useStyles = makeStyles({
	select: {
		minWidth: 120,
	},
});

type Props = {
	chapterName: string;
	onChangeChapterName: (e: any) => void;
	contents: LessonChapterType[];
};

const CreateLesson: VFC<Props> = memo((props) => {
	const classes = useStyles();
	const { chapterName, onChangeChapterName, contents } = props;

	const [type, setType] = useState<"text" | "video" | "">("");
	const types = ["text", "video"];

	const handleChange = useCallback(
		(e) => {
			setType(e.target.value);
		},
		[setType]
	);

	console.log(contents);

	const onClickEdit = () => {
		// setContents([...contents, { chapterName, lessons: { type } }]);
		const target = contents.find((t) => t.chapterName === chapterName);
		console.log(target, "target!!");
		console.log(chapterName, type);
	};

	return (
		<>
			<div>
				<TextInput
					value={chapterName}
					label="チャプター名"
					onChange={onChangeChapterName}
				/>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={type}
					onChange={handleChange}
					className={classes.select}
				>
					{types.map((type) => (
						<MenuItem key={type} value={type}>
							{type}
						</MenuItem>
					))}
				</Select>
				<div className="spacer" />
				<PrimaryButton onClick={() => onClickEdit()} disabled={!chapterName}>
					確定する
				</PrimaryButton>
			</div>
			<style jsx>{`
				.spacer {
					height: 30px;
				}
			`}</style>
		</>
	);
});

export default CreateLesson;
