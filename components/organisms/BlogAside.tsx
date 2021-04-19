import { memo, VFC } from "react";

const BlogAside: VFC = memo(() => {
	return (
		<>
			<aside></aside>
			<style jsx>{`
				aside {
					width: 35%;
               // border: 1px solid #ddd;
				}

				@media screen and (max-width: 480px) {
					/*　画面サイズが768pxから1024pxまではここを読み込む　*/
					aside {
						width: 100%;
					}
				}
			`}</style>
		</>
	);
});

export default BlogAside;
