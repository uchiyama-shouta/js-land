import { db } from "../../src/firebase";
import { ImageType } from "../../types/lesson/ImageType";

export const createLesson = (
	title: string,
	description: string,
	price: number | "",
	image: ImageType
) => {
	if (!title) {
		alert("タイトルを入力してください");
		return;
	}

	const data = {
		title,
		description,
		price: typeof price === "string" && parseInt(price),
		image,
		contents: [],
		isRelease: false,
		id: "",
	};
	const ref = db.collection("lessons").doc();
	const id = ref.id;
	data.id = id;
	db.collection("lessons").doc().set(data, { merge: true });
	return data.id
};
