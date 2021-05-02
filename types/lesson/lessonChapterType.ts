import { LessonContentType } from "./lessonContentType";

export type LessonChapterType = {
	chapterName: string;
	lessons?: LessonContentType[];
};
