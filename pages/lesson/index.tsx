import { GetStaticProps } from "next";
import { memo, VFC } from "react";
import Layout from "../../components/templates/layout/Layout";
import LessonCardList from "../../components/templates/layout/LessonCardList";
import { LessonDataType } from "../../types/lesson/lessonType";
import { lessonDataList } from "../../lib/lesson/LessonDataList";

type Props = {
	datas: LessonDataType[];
};

const lesson: VFC<Props> = memo((props) => {
	const id = props.datas.map((data) => data.id);
	return (
		<Layout description="レッスン一覧ページです。">
			<div className="h-12" />
			<h2 className="text-center mb-12 text-xl font-bold">レッスン一覧</h2>
			<LessonCardList data={props.datas} />
		</Layout>
	);
});

export default lesson;

export const getStaticProps: GetStaticProps = async () => {
	const datas = await lessonDataList();
	return {
		props: {
			datas,
		},
		revalidate: 10,
	};
};
