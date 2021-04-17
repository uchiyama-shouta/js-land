import React from "react";

// 改行コードを<br> に変換する
export const replaceToBr = (text: string) => {
	if (!text) {
		return text;
	} else {
		return text.split("\n").map((str, index) => (
			<React.Fragment key={index}>
				{str}
				<br />
			</React.Fragment>
		));
	}
};
