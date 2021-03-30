import { useEffect, VFC } from "react";
import { useRecoilState } from "recoil";
import Layout from "../components/templates/layout/Layout";
import { userState, UserStateType } from "../src/store/userState";

const Home: VFC = () => {
	const [userData, setUser] = useRecoilState<UserStateType>(userState);

	return (
		<>
			<Layout>
				<p>Hello World</p>
				<p>name: {userData ? userData.username : null}</p>
				<p>email: {userData ? userData.email : null}</p>
				<p>id: {userData ? userData.uid : null}</p>
				{userData.role === 'administrator' && <p>管理者はこの世の神</p>}
			</Layout>
		</>
	);
};

export default Home;
