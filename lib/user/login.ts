import { NextRouter } from "next/router";
import { SetterOrUpdater } from "recoil";
import { auth } from "../../src/firebase";

import { usersRef } from "./usersRef";

export const login = async (
	email: string,
	password: string,
	router: NextRouter,
	setUsers: SetterOrUpdater<any>
) => {
	try {
		const result = await auth.signInWithEmailAndPassword(email, password);
		const uid = result.user.uid;

		console.log(uid);

		await usersRef
			.doc(uid)
			.get()
			.then((snapshot) => {
				const data = snapshot.data();
				setUsers({
					isSignedIn: true,
					role: data.role,
					uid,
					username: data.username,
					email: email,
				});
				router.push("/");
			});
	} catch (err) {
		alert("ログイン出来ませんでした。");
	}
};
