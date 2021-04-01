export type UserStateType = {
	isSignedIn: boolean,
	role: 'customer' | 'administrator',
	uid: string,
	username: string,
	email: string,
}