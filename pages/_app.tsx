import React, { useEffect } from "react";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import type { AppProps } from "next/app";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

import Auth from "../src/auth/Auth";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<title>My page</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<RecoilRoot>
				<Auth>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</Auth>
			</RecoilRoot>
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};