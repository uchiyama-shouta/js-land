import { createContext, ReactNode, useEffect, useState, VFC } from "react";
import { auth } from "../firebase";

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext({ currentUser: undefined });

export const AuthProvider: VFC<AuthProviderProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(undefined);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
