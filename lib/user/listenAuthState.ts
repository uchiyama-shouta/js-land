import { NextRouter } from "next/router";
import { SetterOrUpdater } from "recoil";
import { auth } from "../../src/firebase";
import { usersRef } from "./usersRef";

export const listenAuthState = async (
	router: NextRouter,
	setUsers: SetterOrUpdater<any>
) => {
	auth.onAuthStateChanged((user) => {
		if (user) {
			const uid = user.uid;

			usersRef
				.doc(uid)
				.get()
				.then((snapshot) => {
					const data = snapshot.data();
					if (!data) {
						throw new Error("ユーザーデータが存在しません。");
					}

					setUsers({
						isSignedIn: true,
						role: data.role,
						uid: uid,
						username: data.username,
						email: data.email,
					});
				});
		} else {
			console.log("ログイン出来てない");
			if (
				router.pathname === "/" ||
				router.pathname === "/blog" ||
				router.pathname.match("/blog/")
			) {
				return;
			} else {
				router.push("/login");
			}
		}
	});
};
