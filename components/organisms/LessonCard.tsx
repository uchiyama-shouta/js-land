import React, { memo, VFC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { replaceToBr } from "../../lib/function/replaceToBr";
import { LessonDataType } from "../../types/lesson/lessonType";
import { userState } from "../../src/store/userState";

type Props = LessonDataType;

const LessonCard: VFC<Props> = memo((props) => {
	const { thumbnailPath, title, description, price, id } = props;
	const user = useRecoilValue(userState);
	const router = useRouter();
	const pathName = `/edit/${id}`;
	return (
		<>
			<div className="relative mx-auto w-80 h-21rem rounded shadow-md overflow-hidden">
				<Link href={`/lesson/${id}`}>
					<a className="w-full h-full">
						<Image
							src={thumbnailPath}
							width={320}
							height={170}
							alt="レッスンの画像"
						/>
						<div className="py-2 px-4 transition hover:bg-gray-50">
							<h2 className="mb-2 text-2xl">{title}</h2>
							<p className="h-16 text-black overflow-hidden overflow-ellipsis">
								{replaceToBr(description)}
							</p>
							<hr className="h-px my-2 mx-0 bg-gray-300 border-none flex-shrink-0" />
							<p className="text-xl pb-0">{price.toLocaleString()}円</p>
						</div>
					</a>
				</Link>
				{user.role === "administrator" && (
					<div
						className="absolute top-3 right-3 w-9 h-9 pt-1 pl-2 bg-white rounded-full"
						onClick={() => router.push(pathName)}
					>
						<ArrowForwardIosIcon className="h-6 w-6" />
					</div>
				)}
			</div>
		</>
	);
});

export default LessonCard;
