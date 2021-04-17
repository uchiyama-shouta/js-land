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
		price: typeof price === "string" && parseInt(price),
		image,
		contents: [],
		isRelease: false,
	};
	// const ref = db.collection("lessons").doc();
	// const id = ref.id;
	// data.id = id;
	db.collection("lessons").doc(id).set(data, { merge: true });
};
