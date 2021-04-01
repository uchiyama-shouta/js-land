import { VFC } from "react";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { LessonDataType } from "../../types/lesson/lessonType";
import Layout from "../../components/templates/layout/Layout";

type Props = {
	propsData: LessonDataType;
};

const LessonDetailPage: VFC<Props> = (props) => {
	const { id, thumbnailPath, title, price, copy } = props.propsData;
	console.log(props.propsData.id);
	return (
		<Layout>
         <div style={{height: 60}} />
			<div style={{ margin: "auto", width: 400 }}>
				<Image src={thumbnailPath} width={500} height={300} />
				<h2>{`${title}:　${id}`}</h2>
				<p>{copy}</p>
				<p>{price.toLocaleString() + "円"}</p>
			</div>
		</Layout>
	);
};

export default LessonDetailPage;

const url = "http://localhost:3000/api/lessonSampleData";
export const getStaticProps: GetStaticProps = async (context) => {
	const id = context.params.id;
	const res = await fetch(url);
	const data: LessonDataType[] = await res.json();
	const propsData = data.find((data) => data.id === id);

	return {
		props: {
			propsData,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const data: LessonDataType[] = await fetch(url).then((res) => res.json());
	const paths = data.map((data) => ({
		params: {
			id: data.id,
		},
	}));
	return {
		paths,
		fallback: false,
	};
};
