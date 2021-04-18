import { VFC } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/templates/layout/Layout";
import LessonCardList from "../components/templates/layout/LessonCardList";
import styles from "../styles/components/pages/index.module.css";
import { LessonDataType } from "../types/lesson/lessonType";
import { lessonDataList } from "../lib/lesson/LessonDataList";

type Props = {
	datas: LessonDataType[];
};

const Home: VFC<Props> = ({ datas }) => {
	return (
		<>
			<Layout description="JavaScript特化のオンラインのプログラミング学習サービスです。">
				<section className={styles.firstView}>
					<p className={styles.copy}>
						最新のフロントエンドを学び、
						<br />
						人生を<span className={styles.copy_span}>チョット</span>変えよう
					</p>
				</section>
				<section>
					<h2 className={styles.section_title}>レッスン一覧</h2>
					<LessonCardList data={datas} />
					<Link href="/lesson">
						<a className={styles.button}>レッスン一覧</a>
					</Link>
				</section>
			</Layout>
			<style jsx>{`
				section {
					margin-bottom: 50px;
				}
			`}</style>
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
