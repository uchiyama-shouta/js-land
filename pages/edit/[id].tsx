import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../../src/firebase";

import PrimaryButton from "../../components/atom/button/PrimaryButton";
import TextInput from "../../components/atom/TextInput";
import ImageArea from "../../components/organisms/ImageArea";
import Layout from "../../components/templates/layout/Layout";
import { userState } from "../../src/store/userState";
import { ImageType } from "../../types/lesson/ImageType";

const LessonEdit = () => {
	const router = useRouter();
	const { pageId } = router.query;
	const user = useRecoilValue(userState);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState<ImageType>("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState<number | "">("");
	const [id, setId] = useState<string>('')

	if(typeof(pageId) === 'string') {
		setId(pageId)
	}

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
		db.collection("lessons")
			.get(id)
			.then((doc) => {
				console.log();
			}).catch(error => {
				console.log(error)
		  })
	}, []);
	return (
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
									// createLesson(title, description, price);
									setTitle("");
									setDescription("");
									setPrice("");
								}}
							>
								レッスンを編集する
							</PrimaryButton>
						</div>
					</div>
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
			)}
		</Layout>
	);
};

export default LessonEdit;

// export const getStaticProps: GetStaticProps = async (context) => {
// 	const id = context.params.id;
// 	// const propsData = datas.find((data) => data.id === id);

// 	return {
// 		props: {
// 			// propsData,
// 		},
// 	};
// };

// export const getStaticPaths: GetStaticPaths = async () => {
// 	// const paths = datas.map((data) => ({
// 	// 	params: {
// 	// 		id: data.id,
// 	// 	},
// 	// }));
// 	const paths = [
// 		{
// 			params: {
// 				id: "",
// 			},
// 		},
// 	];
// 	return {
// 		paths,
// 		fallback: false,
// 	};
// };
