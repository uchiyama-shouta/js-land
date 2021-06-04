import Link from "next/link";
import { memo } from "react";

const HeaderLinks = memo(() => {
	return (
		<>
			<button
				className="mr-4 p-2 focus:outline-none transition hover:bg-gray-100 rounded"
				tabIndex={0}
				type="button"
			>
				<Link href="/login">
					<a>ログイン</a>
				</Link>
			</button>
			<button
				className="mr-4 p-2 focus:outline-none transition hover:bg-gray-100 rounded"
				tabIndex={0}
				type="button"
			>
				<Link href="/signUp">
					<a>新規登録</a>
				</Link>
			</button>
		</>
	);
});

export default HeaderLinks;
