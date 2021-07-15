import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { GetServerSideProps } from "next";

import Select from "@material-ui/core/Select";
import Layout from "../../components/templates/layout/Layout";
import PrimaryButton from "../../components/atom/button/PrimaryButton";
import TextInput from "../../components/atom/TextInput";
import { userState } from "../../src/store/userState";
import { lessonDataList } from "../../lib/lesson/LessonDataList";

const LessonEdit = (props) => {
	const user = useRecoilValue(userState);
	const router = useRouter();
	const [type, setType] = useState("");
	const [title, setTitle] = useState("");

	const onChangeTitle = useCallback((e) => {
		setTitle(e.target.value);
	}, [title]);

	const handleChange = useCallback((e) => {
		setType(e.target.value);
	}, [type]);

	useEffect(() => {
		user.isSignedIn && user.role !== "administrator" && router.push("/");
	}, [user]);

	console.log(type);

	return (
		<Layout>
			{user.role === "administrator" && (
				<div className="pt-12 w-4/5 mx-auto">
					<div className="text-center p-12 mx-auto w-96">
						<h2 className="text-center my-3 text-xl font-bold mb-12">
							コンテンツの編集
						</h2>
						<TextInput
							label="タイトル"
							value={title}
							onChange={onChangeTitle}
						/>
						<div className="h-5" />
						<Select
							native
							value={type}
							onChange={handleChange}
							inputProps={{
								name: "type",
								id: "type-native-simple",
							}}
						>
							<option aria-label="None" value="選択してください" />
							<option value="text">text</option>
							<option value="video">video</option>
							<option value="chapter">chapter</option>
						</Select>
						{(!!type && type === "text" && (
							<div>
								<p className="text-lg">text</p>
							</div>
						)) ||
							(type === "video" && (
								<div>
									<p className="text-lg">video</p>
									<span onClick={() => {}}>動画を追加する</span>
								</div>
							))}
						<div className="h-14" />
						<PrimaryButton>レッスンの編集を確定する</PrimaryButton>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default LessonEdit;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params.id;
	const lesson = (await lessonDataList()).find((data) => data.id === id);
	return {
		props: {
			id,
			lessonData: lesson,
		},
	};
};
