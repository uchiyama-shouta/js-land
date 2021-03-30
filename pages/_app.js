import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

import "../styles/globals.css";
import AuthProvider from "../src/auth/AuthProvider";
import { RecoilRoot } from "recoil";
import Auth from "../src/auth/Auth";

export default function MyApp({ Component, pageProps }) {
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
				<AuthProvider>
					<Auth>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<Component {...pageProps} />
						</ThemeProvider>
					</Auth>
				</AuthProvider>
			</RecoilRoot>
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};
