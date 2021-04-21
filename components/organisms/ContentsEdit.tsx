import {
	Dispatch,
	memo,
	SetStateAction,
	useEffect,
	useState,
	VFC,
} from "react";

import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateIcon from "@material-ui/icons/Create";
import { LessonChapterType } from "../../types/lesson/lessonChapterType";
import { LessonContentType } from "../../types/lesson/lessonContentType";
import Divider from "@material-ui/core/Divider";

type Props = {
	contents: LessonChapterType[];
	setContents: Dispatch<SetStateAction<any>>;
};

const useStyles = makeStyles({
	root: {
		height: 110,
		flexGrow: 1,
		maxWidth: 400,
		textAlign: "left",
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

	const onClickCreate = () => {
		setCreateFlag(!createFlag);
	};
	const onClickEdit = () => {
		alert("OK!直したよ！");
	};

	console.log(contents);

	return (
		<>
			<div className="wrapper">
				<Divider />
				{createFlag && <div>おk</div>}
				<AddCircleIcon
					onClick={() => onClickCreate()}
					className={classes.icon}
				/>
				<CreateIcon onClick={() => onClickEdit()} className={classes.icon} />
			</div>
			<style jsx>{`
				.wrapper {
					width: 100%;
					padding: 30px 0;
				}
			`}</style>
		</>
	);
});

export default ContentsEdit;
