import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { db } from "../../src/firebase";

import PrimaryButton from "../../components/atom/button/PrimaryButton";
import Layout from "../../components/templates/layout/Layout";
import { userState } from "../../src/store/userState";
import { ImageType } from "../../types/lesson/ImageType";
import { GetServerSideProps } from "next";
import Select from "@material-ui/core/Select";
import { LessonChapterType } from "../../types/lesson/lessonChapterType";

const LessonEdit = (props) => {
	const { id } = props;
	const user = useRecoilValue(userState);
	const router = useRouter();
	const [type, setType] = useState<string>("");

	const handleChange = (event) => {
		const name = event.target.value;
		setType(name);
	};

	useEffect(() => {
		if (id !== "") {
			db.collection("lessons")
				.doc(id)
				.get()
				.then((snapshot) => {
					const lesson = snapshot.data();

				});
		}
	}, [id]);

	useEffect(() => {
		if (user.isSignedIn && user.role !== "administrator") {
			router.push("/");
		}
	}, [user]);

	console.log(type);

	return (
		<Layout>
			{user.role === "administrator" && (
				<>
					<div className="pt-12 w-4/5 mx-auto">
						<div className="text-center p-12 mx-auto w-96">
							<h2 className="text-center my-3 text-xl font-bold">コンテンツの編集</h2>
							<div className="h-14" />
							<Select
								native
								value={type}
								onChange={handleChange}
								inputProps={{
									name: "age",
									id: "age-native-simple",
								}}
							>
								<option aria-label="None" value="" />
								<option value="text">text</option>
								<option value="video">video</option>
							</Select>
							<div className="h-14" />
							<PrimaryButton>レッスンの編集を確定する</PrimaryButton>
						</div>
					</div>
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
