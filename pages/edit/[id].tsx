import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { db } from "../../src/firebase";

import PrimaryButton from "../../components/atom/button/PrimaryButton";
import Layout from "../../components/templates/layout/Layout";
import { userState } from "../../src/store/userState";
import { ImageType } from "../../types/lesson/ImageType";
import { GetServerSideProps } from "next";
import { editLesson } from "../../lib/lesson/editLesson";
import ContentsEdit from "../../components/organisms/ContentsEdit";
import { LessonDataType } from "../../types/lesson/lessonType";
import { LessonContentType } from "../../types/lesson/lessonContentType";
import { LessonChapterType } from "../../types/lesson/lessonChapterType";

const LessonEdit = (props) => {
	const { id } = props;
	const user = useRecoilValue(userState);
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [image, setImage] = useState<ImageType>(undefined);
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState<number | "">("");
	const [contents, setContents] = useState<LessonChapterType[] | []>([]);

	useEffect(() => {
		if (id !== "") {
			db.collection("lessons")
				.doc(id)
				.get()
				.then((snapshot) => {
					const lesson = snapshot.data();
					console.log(lesson);
					setTitle(lesson.title);
					setDescription(lesson.description);
					setImage(lesson.image);
					setPrice(lesson.price);
					setContents(lesson.contents);
				});
		}
	}, [id]);

	useEffect(() => {
		if (user.isSignedIn && user.role !== "administrator") {
			router.push("/");
		}
	}, [user]);

	return (
		<Layout>
			{user.role === "administrator" && (
				<>
					<div className="container">
						<div className="center">
							<h2 className="">コンテンツの編集</h2>
							<div className="spacer" />
							<div className="spacer" />
							<PrimaryButton>レッスンの編集を確定する</PrimaryButton>
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
						.title {
							text-align: center;
							margin-top: 20px;
							font-size: 30px;
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
			)}
		</Layout>
	);
};

export default LessonEdit;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params.id;
	return {
		props: {
			id,
		},
	};
};
