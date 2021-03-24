import { useEffect, useState, VFC } from "react";

import { db } from "../src/firebase";
import Layout from "./components/Layout";

const Home: VFC = () => {
	const [tasks, setTasks] = useState([{ id: "", title: "" }]);

	useEffect(() => {
		const unSub = db.collection("tasks").onSnapshot((snapshot) => {
			setTasks(
				snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
			);
		});
		return () => unSub();
	}, []);
	return (
		<>
			<Layout>
				<p>Hello World</p>
				<ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
			</Layout>
		</>
	);
};

export default Home;
