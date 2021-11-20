import type { NextPage } from "next";
import Layout from "../components/templates/layout/Layout";

const About: NextPage = () => {
	return (
		<Layout>
			<div className="text-center">
				<h2 className="mt-14 mb-5 text-4xl">About</h2>
				<p className="text-base leading-7">
					JS-landは主に、フロントエンド開発の技術に関して発信するオウンドメディアです。
				</p>
				<p className="text-base">
					JS-landではReactやNext.jsなどの技術や、初学者向けの丁寧な記事などを作っていきます。
				</p>
			</div>
		</Layout>
	);
};

export default About;
