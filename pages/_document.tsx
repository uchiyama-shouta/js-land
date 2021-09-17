import { Children } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import { GA_TRACKING_ID } from "../lib/gtag";

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

MyDocument.getInitialProps = async (ctx) => {
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		styles: [
			...Children.toArray(initialProps.styles),
			sheets.getStyleElement(),
		],
	};
};
