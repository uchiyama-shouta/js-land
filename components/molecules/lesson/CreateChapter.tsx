import PrimaryButton from "../../atom/button/PrimaryButton";
import TextInput from "../../atom/TextInput";

const CreateChapter = (props) => {
	const { chapterName, onChangeChapterName, onClickEdit } = props;
	return (
		<>
			<div>
				<TextInput
					value={chapterName}
					label="チャプター名"
					onChange={onChangeChapterName}
				/>
				<div className="h-7" />
				<PrimaryButton onClick={() => onClickEdit()} disabled={!chapterName}>
					確定する
				</PrimaryButton>
			</div>
		</>
	);
};

export default CreateChapter;
