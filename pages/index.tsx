import { useRouter } from "next/router";
import { useEffect, useState, VFC } from "react";

import Layout from "../components/templates/layout/Layout";
import { auth } from "../src/firebase";

const Home: VFC = () => {
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			user ? setCurrentUser(user) : router.push("/login");
		});
	}, []);


	return (
		<>
			<Layout>
				<p>Hello World</p>
			</Layout>
		</>
	);
};

export default Home;
