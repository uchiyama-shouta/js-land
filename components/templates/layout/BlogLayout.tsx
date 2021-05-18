import { memo, ReactNode, VFC } from "react";
import BlogAside from "../../organisms/BlogAside";

type Props = {
	children: ReactNode;
};

const BlogLayout: VFC<Props> = memo((props) => {
	const { children } = props;
	return (
		<>
			<div className="sm:flex w-11/12 block sm:w-11/12 mx-auto my-12">
				<main className="sm:w-55per-responsive w-full sm:mx-auto">{children}</main>
				{/* 追加されたユーティリティに対してレスポンシブが効かない */}
				<BlogAside />
			</div>
		</>
	);
});

export default BlogLayout;
