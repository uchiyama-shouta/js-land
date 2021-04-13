import { GetStaticProps } from "next";
import { memo, VFC } from "react";
import Layout from "../../components/templates/layout/Layout";
import LessonCardList from "../../components/templates/layout/LessonCardList";
import { LessonDataType } from "../../types/lesson/lessonType";
import { datas } from "../../src/sample/lessonData";

type Props = {
	datas: LessonDataType[];
};

const lesson: VFC<Props> = memo((props) => {
	console.log(props)
	const id = props.datas.map((data) => (
		data.id
	))
	console.log(id)
	return (
		<>
			<Layout description="レッスン一覧ページです。">
				<div className="spacer" />
				<h2 className="section_title">レッスン一覧</h2>
				<LessonCardList data={props.datas} />
			</Layout>
			<style jsx>{`
				div.spacer {
					height: 50px;
				}
            .section_title {
               text-align: center;
               margin: 0 0 50px;
            }
			`}</style>
		</>
	);
});

export default lesson;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			datas,
		},
	};
};
