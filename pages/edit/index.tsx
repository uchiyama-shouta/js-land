import { useCallback, useEffect, useState, VFC } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import Layout from "../../components/templates/layout/Layout";
import ImageArea from "../../components/organisms/ImageArea";
import { userState } from "../../src/store/userState";
import TextInput from "../../components/atom/TextInput";
import PrimaryButton from "../../components/atom/button/PrimaryButton";
import { LessonDataType } from "../../types/lesson/lessonType";
import { createLesson } from "../../lib/lesson/createLesson";

type LessonType = LessonDataType;

type ImageType =
	| ""
	| { id: string | ""; path: string | "" }
	| { id: ""; path: "" };

const Index: VFC = () => {
	const user = useRecoilValue(userState);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState<ImageType>("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState<number | "">("");
	const [id, setId] = useState("");

	const inputTitle = useCallback(
		(e) => {
			setTitle(e.target.value);
		},
		[setTitle]
	);
	const inputDescription = useCallback(
		(e) => {
			setDescription(e.target.value);
		},
		[setDescription]
	);
	const inputPrice = useCallback(
		(e) => {
			setPrice(e.target.value);
		},
		[setPrice]
	);

	return (
		<>
			<Layout>
				{user.role && (
					<>
						<div className="container">
							<div className="center">
								<ImageArea image={image} setImage={setImage} />
								<TextInput
									label="タイトル"
									rows={1}
									value={title}
									onChange={inputTitle}
									fullWidth={true}
								/>
								<TextInput
									label="説明"
									rows={5}
									multiline={true}
									value={description}
									onChange={inputDescription}
									fullWidth={true}
								/>
								<TextInput
									label="値段"
									rows={5}
									value={price}
									onChange={inputPrice}
									fullWidth={true}
									type="number"
								/>
								<div className="spacer" />
								<PrimaryButton
									onClick={() => {
										const LessonId = createLesson(title, description, price, image);
										setTitle("");
										setDescription("");
										setPrice("");
										setImage("");
										setId(LessonId)
									}}
								>
									レッスンを作成する
								</PrimaryButton>

								<Link href={`/edit/${id}`}>
									<a className="link">レッスンの編集へ</a>
								</Link>
							</div>
						</div>
					</>
				)}
			</Layout>
			<style jsx>{`
				.container {
					padding-top: 50px;
					width: 80%;
					margin: 0 auto;
				}
				.center {
					padding-top: 50px;
					text-align: center;
					margin: 0 auto;
					width: 400px;
				}
				.spacer {
					height: 60px;
				}
				.link {
					display: block;
					margin-top: 10px;
					color: #555;
				}
				.link:hover {
					text-decoration: underline;
				}
			`}</style>
		</>
	);
};

export default Index;

// useEffect(() => {
// 	const unSub = db.collection("lessons").onSnapshot((snapshot) => {
// 		const datas: LessonType[] = snapshot.docs.map((doc) => ({
// 			title: doc.data().title,
// 			thumbnailPath: doc.data().thumbnailPath,
// 			copy: doc.data().copy,
// 			price: doc.data().price,
// 			id: doc.data().id,
// 			contents: [],
// 		}));
// 		setLessons(datas);
// 	});
// 	return () => unSub();
// }, []);
