import { LessonChapterType } from "./lessonChapterType";

export type LessonDataType = {
	thumbnailPath: string;
	title: string;
	description: string;
	price: number;
	id?: string;
	contents?: LessonChapterType[];
	isRelease?: Boolean;
};
