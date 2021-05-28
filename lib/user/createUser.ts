import { NextRouter } from "next/router";
import { auth, FirebaseTimestamp } from "../../src/firebase";
import { usersRef } from "./usersRef";

export const createUser = async (
	router: NextRouter,
	name: string,
	email: string,
	password: string
) => {
	try {
		const auth = await import("../../src/firebase").then((mod) => mod.auth);
		await auth
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				const user = result.user;
				if (user) {
					const uid = user.uid;
					const timestamp = FirebaseTimestamp.now();

					const userInitialData = {
						customer_id: "",
						created_at: timestamp,
						email: email,
						role: "customer",
						payment_method_id: "",
						uid: uid,
						updated_at: timestamp,
						username: name,
					};

					usersRef
						.doc(uid)
						.set(userInitialData)
						.then(() => {
							router.push("/");
						});
				}
			})
			.catch(() => {
				alert("アカウント登録に失敗しました。もう1度お試しください。");
			});
	} catch (err) {
		alert("アカウント登録に失敗しました。もう1度お試しください。");
		throw new Error(err);
	}
};
