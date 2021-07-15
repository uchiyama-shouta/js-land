import React, { memo, VFC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import { replaceToBr } from "../../lib/function/replaceToBr";
import { LessonDataType } from "../../types/lesson/lessonType";
import { userState } from "../../src/store/userState";

import dynamic from "next/dynamic";

type Props = LessonDataType;

const ArrowLink = dynamic(() => import("../atom/ArrowLink"));

const LessonCard: VFC<Props> = memo((props) => {
	const { thumbnailPath, title, description, price, id } = props;
	const user = useRecoilValue(userState);
	const pathName = `/edit/${id}`;
	return (
		<div className="relative mx-auto w-80 h-[21rem] rounded shadow-md overflow-hidden">
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
			{user.role === "administrator" && <ArrowLink pathName={pathName} />}
		</div>
	);
});

export default LessonCard;
