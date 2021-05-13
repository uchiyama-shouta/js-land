import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

import Layout from "../../components/templates/layout/Layout";
import LessonEditCard from "../../components/organisms/LessonEditCard";

import { lessonDataList } from "../../lib/lesson/LessonDataList";
import { LessonDataType } from "../../types/lesson/lessonType";

import { userState } from "../../src/store/userState";

SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

const useStyles = makeStyles({
	container: {
		width: "90vw",
		margin: "0 auto",
		whiteSpace: "nowrap",
	},
	card: {
		width: 380,
		padding: 10,
		margin: "30px auto",
		minHeight: 500,
	},
});

const lesson = () => {
	const [datas, setDatas] = useState<LessonDataType[] | []>([]);
	const classes = useStyles();
	const user = useRecoilValue(userState);

	useEffect(() => {
		lessonDataList().then((res) => {
			setDatas(res);
		});
	}, []);
	return (
		<>
			<Layout>
				{user.role === "administrator" && (
					<div className={classes.container}>
						<h1>Edit</h1>
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
										<Card className={classes.card}>
											<LessonEditCard data={data} />
										</Card>
									</SwiperSlide>
								))}
						</Swiper>
					</div>
				)}
			</Layout>
			<style jsx>{`
				h1 {
					text-align: center;
					margin: 10px 0;
				}
				p {
					font-size: 16px;
				}
				.spacer {
					height: 30px;
				}
			`}</style>
		</>
	);
};

export default lesson;
