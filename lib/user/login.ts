// import { NextRouter } from "next/router";
// import { SetterOrUpdater } from "recoil";

// import { usersRef } from "./usersRef";

// export const login = async (
// 	email: string,
// 	password: string,
// 	router: NextRouter,
// 	setUsers: SetterOrUpdater<any>
// ) => {
// 	try {
// 		const auth = await import("../../src/firebase").then((mod) => mod.auth);
// 		const result = await auth.signInWithEmailAndPassword(email, password);
// 		const uid = result.user.uid;

// 		await usersRef
// 			.doc(uid)
// 			.get()
// 			.then((snapshot) => {
// 				const data = snapshot.data();
// 				setUsers({
// 					isSignedIn: true,
// 					role: data.role,
// 					uid,
// 					username: data.username,
// 					email: email,
// 				});
// 				router.push("/");
// 			});
// 	} catch (err) {
// 		alert("ログイン出来ませんでした。");
// 	}
// };
