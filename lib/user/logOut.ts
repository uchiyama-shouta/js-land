import { NextRouter } from "next/router";
import { SetterOrUpdater } from "recoil";
import { auth } from "../../src/firebase";
import { initialState } from "../../src/store/userState";
import { UserStateType } from "../../types/user/UserStateType";

export const logOut = async (
	setUser: SetterOrUpdater<UserStateType>,
	router: NextRouter
) => {
	try {
		await auth.signOut();
		setUser(initialState);
		router.push("/login");
	} catch (error) {
		alert("ログアウトできませんでした");
		console.log(error.message);
	}
};
