import { memo, useCallback, useState, VFC } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/components/organisms/LessonEditCard.module.css";

import TextInput from "../atom/TextInput";
import { replaceToBr } from "../../lib/function/replaceToBr";
import { LessonDataType } from "../../types/lesson/lessonType";
import PrimaryButton from "../atom/button/PrimaryButton";

type Props = {
	data: LessonDataType;
};

const LessonEditCard: VFC<Props> = memo((props) => {
	const { data } = props;
	// title
	const [titleFlag, setTitleFlag] = useState(false);
	const [title, setTitle] = useState(data.title);
	const onChangeTitle = useCallback(
		(e) => {
			setTitle(e.target.value);
		},
		[setTitle]
	);
	const handleTitleFlag = useCallback(() => {
		setTitleFlag(!titleFlag);
	}, [titleFlag]);
	// price
	const [priceFlag, setPriceFlag] = useState(false);
	const [price, setPrice] = useState(data.price);
	const onChangePrice = useCallback(
		(e) => {
			setPrice(e.target.value);
		},
		[setPrice]
	);
	const handlePriceFlag = useCallback(() => {
		setPriceFlag(!priceFlag);
	}, [priceFlag]);
	// description
	const [descriptionFlag, setDescriptionFlag] = useState(false);
	const [description, setDescription] = useState(data.description);
	const onChangeDescription = useCallback(
		(e) => {
			setDescription(e.target.value);
		},
		[setDescription]
	);
	const handleDescriptionFlag = useCallback(() => {
		setDescriptionFlag(!descriptionFlag);
	}, [descriptionFlag]);

	return (
		<>
			<div>
				{titleFlag ? (
					<div onDoubleClick={handleTitleFlag}>
						<TextInput
							label="タイトル"
							value={title}
							onChange={onChangeTitle}
						/>
					</div>
				) : (
					<h2 onDoubleClick={handleTitleFlag}>{title}</h2>
				)}
				<div className="spacer" />
				<Image width={400} height={250} src={data.thumbnailPath} />
				{priceFlag ? (
					<div onDoubleClick={handlePriceFlag}>
						<TextInput
							label="値段"
							value={price}
							onChange={onChangePrice}
							type="number"
						/>
					</div>
				) : (
					<p onDoubleClick={handlePriceFlag} className={styles.p}>
						{data.price}円
					</p>
				)}
				{descriptionFlag ? (
					<div onDoubleClick={handleDescriptionFlag}>
						<TextInput
							label="説明"
							value={description}
							onChange={onChangeDescription}
							multiline
							rows={5}
						/>
					</div>
				) : (
					<p onDoubleClick={handleDescriptionFlag} className={styles.p}>
						{replaceToBr(data.description)}
					</p>
				)}
				<div className="spacer" />
				<PrimaryButton>保存する</PrimaryButton>
				<div className="spacer" />
				<Link href={`/edit/${data.id}`}>
					<a className={styles.link}>コンテンツの編集へ</a>
				</Link>
			</div>
			<style jsx>{`
				.spacer {
					height: 30px;
				}
			`}</style>
		</>
	);
});

export default LessonEditCard;
