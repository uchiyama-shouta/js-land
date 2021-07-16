import { VFC } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/templates/layout/Layout";
import { BlogDataType } from "../types/blog/blogDataType";
import Article from "../components/molecules/blog/Article";
import { BlogContentDatatype } from "../types/blog/blogContentDataType";
// import LessonCardList from "../components/templates/layout/LessonCardList";
// import { LessonDataType } from "../types/lesson/lessonType";
// import { lessonDataList } from "../lib/lesson/LessonDataList";

type Props = {
	blog: BlogContentDatatype[];
};

const Home: VFC<Props> = ({ blog }) => {
	return (
		<Layout description="JavaScript特化のオンラインのプログラミング学習サービスです。">
			<section className="relative w-screen bg-[#28b4ff] bg-opacity-60 h-96 mb-12">
				<p className="absolute top-2/4 left-2/4 text-xl text-center sm:w-auto w-11/12 transform -translate-x-1/2 -translate-y-1/2">
					最新のフロントエンドを学び、
					<br />
					人生を
					<span className="text-3xl text-red-600 font-bold">チョット</span>
					変えよう
				</p>
			</section>
			<section className="mb-12">
				<h2 className="text-center mb-12 text-xl font-semibold">記事</h2>
				<div className="w-full flex">
					<div className="w-1/2 mx-auto flex flex-wrap justify-around">
						{blog.map((blog) => (
							<div className="mb-5">
								<Article key={blog.id} blog={blog} />
							</div>
						))}
					</div>
				</div>

				<Link href="/blog">
					<a className="text-center mt-12 mx-auto w-60 py-4 text-base rounded-md bg-blue-600 text-white block font-semibold">
						記事一覧
					</a>
				</Link>
			</section>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const key = {
		headers: { "X-API-KEY": process.env.NEXT_PUBLIC_BLOG_APIKEY },
	};
	const res = await fetch("https://shou-blog.microcms.io/api/v1/blog-js", key);
	const data: BlogDataType = await res.json();
	const blog = data.contents.slice(0, 4);

	return {
		props: {
			blog,
		},
		revalidate: 10,
	};
};

export default Home;
