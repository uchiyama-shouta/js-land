import { atom } from "recoil";

export type UserStateType = {
	isSignedIn: boolean,
	role: 'customer' | 'administrator',
	uid: string,
	username: string,
	email: string,
}

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
