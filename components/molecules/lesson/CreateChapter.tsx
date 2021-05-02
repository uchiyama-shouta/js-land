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
};

export default CreateChapter;
