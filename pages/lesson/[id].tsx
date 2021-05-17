import { VFC } from "react";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { LessonDataType } from "../../types/lesson/lessonType";
import Layout from "../../components/templates/layout/Layout";
import { lessonDataList } from "../../lib/lesson/LessonDataList";

type Props = {
	propsData: LessonDataType;
};

const LessonDetailPage: VFC<Props> = (props) => {
	const { id, thumbnailPath, title, price, description } = props.propsData;
	
	return (
		<Layout description={`${title}の購入ページです。`}>
			<div className="h-14" />
			<div className="mx-auto " style={{ width: 400 }}>
				<Image
					src={thumbnailPath}
					width={500}
					height={300}
					alt="レッスンのサムネイル画像です。"
				/>
				<h2 className="text-xl">{`${title}:　${id}`}</h2>
				<p>{description}</p>
				<p>{price.toLocaleString() + "円"}</p>
			</div>
		</Layout>
	);
};

export default LessonDetailPage;

export const getStaticProps: GetStaticProps = async (context) => {
	const id = context.params.id;
	const datas = await lessonDataList();
	const propsData = datas.find((data) => data.id === id);

	return {
		props: {
			propsData,
		},
		revalidate: 10,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const datas = await lessonDataList();
	const paths = datas.map((data) => ({
		params: {
			id: data.id,
		},
	}));
	return {
		paths,
		fallback: false,
	};
};
