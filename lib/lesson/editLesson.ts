import { db } from "../../src/firebase";
import { ImageType } from "../../types/lesson/ImageType";

export const editLesson = (
	id: string,
	title?: string,
	description?: string,
	price?: number | "",
	image?: ImageType,
) => {
	const data = {
		id,
		title,
		description,
		price: typeof price === "string" ? parseInt(price) : price,
		image,
		contents: [],
		isRelease: false,
	};
	db.collection("lessons").doc(id).set(data, { merge: true });
};
