import { memo, ReactNode, VFC } from "react";

import styles from "../../../styles/components/template/blogLayout.module.css";

type Props = {
	children: ReactNode;
};

const BlogLayout: VFC<Props> = memo((props) => {
	const { children } = props;
	return (
		<>
			<div className={styles.container}>
				<main className={styles.main}>{children}</main>
				<aside className={styles.aside}></aside>
			</div>
		</>
	);
});

export default BlogLayout;
