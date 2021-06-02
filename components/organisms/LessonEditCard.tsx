import { memo, useCallback, useState, VFC } from "react";
import Image from "next/image";
import Link from "next/link";

import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

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

	return (
		<div>
			{titleFlag ? (
				<div onDoubleClick={handleTitleFlag}>
					<TextInput label="タイトル" value={title} onChange={onChangeTitle} />
				</div>
			) : (
				<h2 className="text-xl font-bold" onDoubleClick={handleTitleFlag}>
					{title}
				</h2>
			)}
			<div className="spacer" />
			<Image width={400} height={250} src={image.path} />
			<div className="text-left">
				<span>サムネイル画像の登録する</span>
				<IconButton className="w-6 h-6">
					<label>
						<AddPhotoAlternateIcon />
						<input
							className="hidden"
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
				<p onDoubleClick={handlePriceFlag} className="text-base">
					{data.price}円
				</p>
			)}
			{descriptionFlag ? (
				<div className="h-32" onDoubleClick={handleDescriptionFlag}>
					<TextInput
						label="説明"
						value={description}
						onChange={onChangeDescription}
						multiline
						rows={20}
					/>
				</div>
			) : (
				<p onDoubleClick={handleDescriptionFlag} className="text-base">
					{replaceToBr(data.description)}
				</p>
			)}
			<div className="h-8" />
			<div className="text-center">
				<PrimaryButton
					onClick={() => {
						editLesson(data.id, title, description, price, image);
						setTitle("");
						setDescription("");
						setPrice(0);
						alert("保存できました");
					}}
				>
					保存する
				</PrimaryButton>
			</div>
			<div className="h-8" />
			<Link href={`/edit/${data.id}`}>
				<a className="block mt-2 text-center hover:underline">
					コンテンツの編集へ
				</a>
			</Link>
		</div>
	);
});

export default LessonEditCard;
