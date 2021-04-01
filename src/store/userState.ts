import { atom } from "recoil";
import { UserStateType } from "../../types/user/UserStateType";



export const initialState: UserStateType = {
	isSignedIn: false,
	role: "customer",
	uid: "",
	username: "",
	email: "",
};

export const userState = atom<UserStateType>({
	key: "userState",
	default: initialState,
});
