import { memo, useCallback, useState, VFC } from "react";
import Image from "next/image";
import Link from "next/link";

import TextInput from "../atom/TextInput";
import { replaceToBr } from "../../lib/function/replaceToBr";
import { LessonDataType } from "../../types/lesson/lessonType";

type Props = {
	data: LessonDataType;
};

const LessonEditCard: VFC<Props> = memo((props) => {
	const { data } = props;
	// const [titleFlag, setTitleFlag] = useState(false);
	// const [title, setTitle] = useState(data.title);
	// const onChangeTitle = useCallback(
	// 	(e) => {
	// 		setTitle(e.target.value);
	// 	},
	// 	[setTitle]
	// );
	// const handleTitleFlag = useCallback(() => {
	// 	setTitleFlag(!titleFlag);
	// }, [titleFlag]);

	// console.log(titleFlag);

	return (
		<>
			<div>
				{/* {titleFlag ? (
					<TextInput label="タイトル" value={title} onChange={onChangeTitle} />
				) : (
					<h2 onDoubleClick={handleTitleFlag}>{title}</h2>
				)} */}
				<h2>{data.title}</h2>
				<div className="spacer" />
				<Image width={400} height={250} src={data.thumbnailPath} />
				<p>{data.price}円</p>
				<p>{replaceToBr(data.description)}</p>
				<div className="spacer" />
				<Link href={`/edit/${data.id}`}>
					<a className="link">コンテンツの編集へ</a>
				</Link>
			</div>
			<style jsx>{`
				h1 {
					text-align: center;
					margin: 10px 0;
				}
				p {
					font-size: 16px;
				}
				.spacer {
					height: 30px;
				}
				.link {
					display: block;
					margin-top: 10px;
					color: #555;
					text-align: center;
				}
				.link:hover {
					text-decoration: underline;
				}
			`}</style>
		</>
	);
});

export default LessonEditCard;
