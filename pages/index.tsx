import { VFC } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/templates/layout/Layout";
import LessonCardList from "../components/templates/layout/LessonCardList";
import { LessonDataType } from "../types/lesson/lessonType";
import { lessonDataList } from "../lib/lesson/LessonDataList";

type Props = {
	datas: LessonDataType[];
};

const Home: VFC<Props> = ({ datas }) => {
	return (
		<>
			<Layout description="JavaScript特化のオンラインのプログラミング学習サービスです。">
				<section className="relative w-screen bg-sky-blue h-96 mb-12">
					<p className="absolute top-2/4 left-2/4 text-xl text-center sm:w-auto w-11/12 translate-center">
						最新のフロントエンドを学び、
						<br />
						人生を
						<span className="text-3xl text-red-600 font-bold">チョット</span>
						変えよう
					</p>
				</section>
				<section className="mb-12">
					<h2 className="text-center mb-12 text-xl font-semibold">
						レッスン一覧
					</h2>
					<LessonCardList data={datas} />
					<Link href="/lesson">
						<a className="text-center mt-12 mx-auto w-60 py-4 text-base rounded-md bg-blue-600 text-white block font-semibold">
							レッスン一覧
						</a>
					</Link>
				</section>
			</Layout>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const datas = await lessonDataList();
	return {
		props: {
			datas,
		},
		revalidate: 10,
	};
};

export default Home;
