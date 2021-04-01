import { NextApiRequest, NextApiResponse } from "next";

// const createRondomId = () => {
// 	var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
// 	var N = 16;
// 	const id = Array.from(Array(N))
// 		.map(() => S[Math.floor(Math.random() * S.length)])
// 		.join("");
// 	return id;
// };

const datas = [
	{
		thumbnailPath: "/image/lesson-image.jpg",
		title: "タイトル",
		copy:
			"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
		price: 10000,
		id: "jzXbSQknJFPaBywr",
	},
	{
		thumbnailPath: "/image/lesson-image.jpg",
		title: "タイトル",
		copy:
			"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
		price: 10000,
		id: "GjBkIUStKaNmOsu9",
	},
	{
		thumbnailPath: "/image/lesson-image.jpg",
		title: "タイトル",
		copy:
			"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
		price: 10000,
		id: "ik1vkCCSGNBCeHHf",
	},
	{
		thumbnailPath: "/image/lesson-image.jpg",
		title: "タイトル",
		copy:
			"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
		price: 10000,
		id: "V5UhTiJzoJvj8jMt",
	},
	{
		thumbnailPath: "/image/lesson-image.jpg",
		title: "タイトル",
		copy:
			"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
		price: 10000,
		id: "5oo6x1cLccLmDoyF",
	},
	{
		thumbnailPath: "/image/lesson-image.jpg",
		title: "タイトル",
		copy:
			"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
		price: 10000,
		id: "GSgLyslUNyke2sUb",
	},
	{
		thumbnailPath: "/image/lesson-image.jpg",
		title: "タイトル",
		copy:
			"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
		price: 10000,
		id: "EuP7O1ngaPoNe3pZ",
	},
	{
		thumbnailPath: "/image/lesson-image.jpg",
		title: "タイトル",
		copy:
			"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
		price: 10000,
		id: "qoUyne6TbVlZXY4s",
	},
	{
		thumbnailPath: "/image/lesson-image.jpg",
		title: "タイトル",
		copy:
			"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
		price: 10000,
		id: "ObTWc84ozEHrzzou",
	},
	{
		thumbnailPath: "/image/lesson-image.jpg",
		title: "タイトル",
		copy:
			"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
		price: 10000,
		id: "f9ylf0ZGj9lu9aax",
	},
];

// datas.map((d) => (d.id = createRondomId()));

export default (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json(datas);
};
