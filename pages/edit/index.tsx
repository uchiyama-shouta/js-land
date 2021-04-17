import { useCallback, useEffect, useState, VFC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
	const router = useRouter();
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

	useEffect(() => {
		if (user && user.role !== "administrator") {
			setTimeout(() => {
				router.push("/");
			}, 3000);
		}
	});

	return (
		<>
			<Layout>
				{user.role === "administrator" && (
					<>
						<div className="container">
							<div className="center">
								<h2 className="">レッスンの作成</h2>
								<div className="spacer" />
								<ImageArea image={image} setImage={setImage} />
								<div className="wraper">
									<TextInput
										label="タイトル"
										value={title}
										onChange={inputTitle}
									/>
									<TextInput
										label="説明"
										rows={5}
										multiline={true}
										value={description}
										onChange={inputDescription}
									/>
									<TextInput
										label="値段"
										rows={5}
										value={price}
										onChange={inputPrice}
										type="number"
									/>
								</div>
								<div className="spacer" />
								<PrimaryButton
									onClick={() => {
										const LessonId = createLesson(
											title,
											description,
											price,
											image
										);

										setTitle("");
										setDescription("");
										setPrice("");
										setImage("");

										setId(LessonId);
									}}
								>
									レッスンを作成する
								</PrimaryButton>

								<Link href={`/edit/${id}`}>
									<a className="link">レッスンの編集へ</a>
								</Link>

								<div className="spacer" />
							</div>
						</div>
					</>
				)}
			</Layout>
			<style jsx>{`
				.title {
					text-align: center;
					margin-top: 20px;
					font-size: 30px;
				}
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
				@media screen and (max-width: 480px) {
					.center {
						width: 370px;
						margin-left: 0;
					}
					.wraper {
						width: 90%;
					}
				}
			`}</style>
		</>
	);
};

export default Index;
