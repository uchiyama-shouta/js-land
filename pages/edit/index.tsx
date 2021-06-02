import { useCallback, useEffect, useState, VFC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import Layout from "../../components/templates/layout/Layout";
import ImageArea from "../../components/organisms/ImageArea";
import { userState } from "../../src/store/userState";
import TextInput from "../../components/atom/TextInput";
import PrimaryButton from "../../components/atom/button/PrimaryButton";
import { createLesson } from "../../lib/lesson/createLesson";
import { ImageType } from "../../types/lesson/ImageType";

const Index: VFC = () => {
	const user = useRecoilValue(userState);
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [image, setImage] = useState<ImageType>(undefined);
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
		if (user.isSignedIn && user.role !== "administrator") {
			router.push("/");
		}
	}, [user]);

	return (
		<Layout>
			{user.role === "administrator" && (
				<div className="w-4/5 mx-auto">
					<div className="text-center mx-auto pt-12 w-80 sm:w-96">
						<h2 className="text-center text-xl font-bold">レッスンの作成</h2>
						<div className="h-14" />
						<ImageArea image={image} setImage={setImage} />
						<div className="wraper">
							<TextInput label="タイトル" value={title} onChange={inputTitle} />
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
						<div className="h-14" />
						<PrimaryButton
							onClick={() => {
								const LessonId = createLesson(title, description, price, image);

								setTitle("");
								setDescription("");
								setPrice("");
								setImage(undefined);

								setId(LessonId);
							}}
						>
							レッスンを作成する
						</PrimaryButton>

						<Link href={`/edit/${id}`}>
							<a className="block mt-2 hover:underline">レッスンの編集へ</a>
						</Link>
						<Link href={`/edit/lesson`}>
							<a className="block mt-2 hover:underline">レッスンの一覧へ</a>
						</Link>
						<div className="h-14" />
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Index;
