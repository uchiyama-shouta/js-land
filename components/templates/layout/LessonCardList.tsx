import React, { memo, VFC } from "react";

import { LessonDataType } from "../../../types/lesson/lessonType";
import LessonCard from "../../organisms/LessonCard";
import { useRecoilValue } from "recoil";
import { userState } from "../../../src/store/userState";

type Props = {
	data: LessonDataType[];
};

const LessonCardList: VFC<Props> = memo((props) => {
	const { data } = props;
	const user = useRecoilValue(userState);

	return (
		<div className="w-11/12 flex-grow mx-auto md:max-w-6xl max-w-2xl">
			<div className="w-full flex flex-wrap box-border items-center justify-center">
				<div className="w-screen-plus-32 -m-4 block sm:flex flex-wrap box-border">
					{data.length ? (
						data.map((data) => (
							<React.Fragment key={data.id}>
								{user.role === "administrator" ? (
									<div className="px-4 py-4 box-border m-0" key={data.id}>
										<LessonCard
											thumbnailPath={data.thumbnailPath}
											title={data.title}
											description={data.description}
											price={data.price}
											id={data.id}
										/>
									</div>
								) : data.isRelease ? (
									<div className="px-4 py-4 box-border m-0" key={data.id}>
										<LessonCard
											thumbnailPath={data.thumbnailPath}
											title={data.title}
											description={data.description}
											price={data.price}
											id={data.id}
										/>
									</div>
								) : null}
							</React.Fragment>
						))
					) : (
						<p className="text-center mx-auto text-xl leading-4">
							comming soon...
						</p>
					)}
				</div>
			</div>
		</div>
	);
});

export default LessonCardList;
