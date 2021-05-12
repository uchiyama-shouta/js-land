import { memo, useCallback, useState, VFC } from "react";
import Image from "next/image";
import Link from "next/link";

import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

import styles from "../../styles/components/organisms/LessonEditCard.module.css";

import TextInput from "../atom/TextInput";
import { replaceToBr } from "../../lib/function/replaceToBr";
import { LessonDataType } from "../../types/lesson/lessonType";
import PrimaryButton from "../atom/button/PrimaryButton";
import { editLesson } from "../../lib/lesson/editLesson";
import { ImageType } from "../../types/lesson/ImageType";
import { storage } from "../../src/firebase";
import { createId } from "../../lib/function/createRandomId";

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
	// image
	const [image, setImage] = useState<ImageType>({
		id: "",
		path: data.thumbnailPath,
	});
	const uploadImage = useCallback(
		(e) => {
			const file = e.target.files;
			let blob = new Blob(file, { type: "image/jpeg" });

			const fileName = createId();

			const uploadRef = storage.ref("images").child(fileName);
			const uploadTask = uploadRef.put(blob);

			uploadTask
				.then(() => {
					uploadTask.snapshot.ref
						.getDownloadURL()
						.then((downloadURL: string) => {
							const newImage = { id: fileName, path: downloadURL };
							setImage(newImage);
						});
				})
				.catch(() => {});
		},
		[setImage]
	);

	console.log(image);

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
				<Image width={400} height={250} src={image.path} />
				<div className="text-right">
					<span>サムネイル画像の登録する</span>
					<IconButton className="icon">
						<label>
							<AddPhotoAlternateIcon />
							<input
								className="none"
								type="file"
								id="image"
								onChange={(e) => {
									uploadImage(e);
								}}
							/>
						</label>
					</IconButton>
				</div>
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
					<div className="text-area" onDoubleClick={handleDescriptionFlag}>
						<TextInput
							label="説明"
							value={description}
							onChange={onChangeDescription}
							multiline
							rows={20}
						/>
					</div>
				) : (
					<p onDoubleClick={handleDescriptionFlag} className={styles.p}>
						{replaceToBr(data.description)}
					</p>
				)}
				<div className="spacer" />
				<div className="center">
					<PrimaryButton
						onClick={() => {
							editLesson(data.id, title, description, price, image);
							setTitle("");
							setDescription("");
							setPrice(0);
						}}
					>
						保存する
					</PrimaryButton>
				</div>
				<div className="spacer" />
				<Link href={`/edit/${data.id}`}>
					<a className={styles.link}>コンテンツの編集へ</a>
				</Link>
			</div>
			<style jsx>{`
				.spacer {
					height: 30px;
				}
				.center {
					text-align: center;
				}
				.text-area {
					height: 125px;
				}
				.none {
					display: none;
				}
				.icon {
					margin-right: 8;
					height: 45;
					width: 45;
				}
			`}</style>
		</>
	);
});

export default LessonEditCard;
