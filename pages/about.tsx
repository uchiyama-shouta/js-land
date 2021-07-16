import Layout from "../components/templates/layout/Layout";

const About = () => {
	return (
		<Layout>
			<div className="text-center">
				<h2 className="mt-14 mb-5 text-4xl">About</h2>
				<p>
					JS-landは主に、フロントエンド開発の技術に関して発信するオウンドメディアです。
				</p>
				<p>
					JS-landではReactやNext.jsなどの技術や、初学者向けの丁寧な記事などを作っていきます。
				</p>
			</div>
         <style jsx>{`
            p {
               font-size: 16px;
               line-height: 30px;
            }   
         `}</style>
		</Layout>
	);
};

export default About;
