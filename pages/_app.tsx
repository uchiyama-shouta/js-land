// import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import type { AppProps } from "next/app";
// import PropTypes from "prop-types";
// import { ThemeProvider } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";

import "../styles/globals.css";
import { GA_TRACKING_ID, pageview } from "../lib/gtag";

if (GA_TRACKING_ID) {
	Router.events.on("routeChangeComplete", (url) => pageview(url));
}

export default function MyApp({ Component, pageProps }: AppProps) {
	// useEffect(() => {
	// 	const jssStyles = document.querySelector("#jss-server-side");
	// 	if (jssStyles) {
	// 		jssStyles.parentElement.removeChild(jssStyles);
	// 	}
	// }, []);

	return (
		<>
			<Head>
				<title>My page</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			{/* <ThemeProvider theme={theme}> */}
			{/* <CssBaseline /> */}
			<Component {...pageProps} />
			{/* </ThemeProvider> */}
		</>
	);
}

// MyApp.propTypes = {
// 	Component: PropTypes.elementType.isRequired,
// 	pageProps: PropTypes.object.isRequired,
// };
