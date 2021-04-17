import { atom } from "recoil";
import { LessonDataType } from "../../types/lesson/lessonType";

export const initialState: LessonDataType = {
	thumbnailPath: "",
	title: "",
	description: "",
	price: 0,
	id: "",
	contents: [],
};

export const lessonState = atom<LessonDataType>({
	key: "lessonState",
	default: initialState,
});
