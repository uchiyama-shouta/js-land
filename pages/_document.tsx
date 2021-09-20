import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="ja">
				<Head>
					<link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
					<link rel="apple-touch-icon" href="/favicon.png" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
