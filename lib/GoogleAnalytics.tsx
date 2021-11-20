import Script from "next/script";
import { GA_TRACKING_ID } from "./gtag";

const GoogleAnalytics = () => {
	const script = `
	window.dataLayer = window.dataLayer || []
	function gtag(){dataLayer.push(arguments)}
	gtag('js', new Date())
	gtag('config', '${GA_TRACKING_ID}')`;
	
	return (
		<>
			<Script
				defer
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
			/>
			<Script id="ga" defer>
				{script}
			</Script>
		</>
	);
};

export default GoogleAnalytics;
