import { useEffect, useState, VFC } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import Layout from "../components/templates/layout/Layout";
import { auth } from "../src/firebase";
import { userState } from "../src/store/userState";

const Home: VFC = () => {
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState(null);
	const user = useRecoilValue(userState);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			user ? setCurrentUser(user) : router.push("/login");
		});
	}, []);

	console.log(currentUser.uid)

	return (
		<>
			<Layout>
				<p>Hello World</p>
				<p>name: {user ? user.username : null}</p>
				<p>email: {user ? user.email : null}</p>
				<p>id: {user ? user.uid : null}</p>
				<p>isAdmin: {user ? user.uid : null}</p>
			</Layout>
		</>
	);
};

export default Home;
