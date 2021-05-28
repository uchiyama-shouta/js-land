import { LessonDataType } from "../../types/lesson/lessonType";

export const lessonDataList = async () => {
	const db = await import("../../src/firebase").then((mod) => mod.db);
	const lessonsRef = await db.collection("lessons").get();
	const datas = lessonsRef.docs.map((doc) => {
		const docData = doc.data();
		const data: LessonDataType = {
			thumbnailPath: docData.image.path,
			title: docData.title,
			description: docData.description,
			price: docData.price,
			id: doc.id,
			contents: docData.contents,
			isRelease: docData.isRelease,
		};
		return data;
	});
	return datas;
};
