import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

import Layout from "../../components/templates/layout/Layout";
import LessonEditCard from "../../components/organisms/LessonEditCard";

import { lessonDataList } from "../../lib/lesson/LessonDataList";
import { LessonDataType } from "../../types/lesson/lessonType";

import { userState } from "../../src/store/userState";

SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

const lesson = () => {
	const [datas, setDatas] = useState<LessonDataType[] | []>([]);
	const user = useRecoilValue(userState);

	useEffect(() => {
		lessonDataList().then((res) => {
			setDatas(res);
		});
	}, []);
	return (
		<Layout>
			{user.role === "administrator" && (
				<div className="w-11/12 mx-auto whitespace-nowrap">
					<h1 className="text-center my-3 text-3xl font-bold">Edit</h1>
					<Swiper
						spaceBetween={50}
						slidesPerView={1}
						pagination={{
							type: "bullets",
							clickable: true,
							dynamicBullets: true,
						}}
						navigation
						loop
					>
						{!!datas.length &&
							datas.map((data: LessonDataType) => (
								<SwiperSlide key={data.id}>
									<div className="bg-white transition-shadow rounded shadow overflow-hidden w-96 mx-auto my-8 p-3">
										<LessonEditCard data={data} />
									</div>
								</SwiperSlide>
							))}
					</Swiper>
				</div>
			)}
		</Layout>
	);
};

export default lesson;
