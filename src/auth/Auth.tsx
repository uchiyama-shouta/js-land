import { memo, ReactNode, useEffect, VFC } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import { listenAuthState } from "../../lib/user/listenAuthState";
import { userState } from "../store/userState";

type Props = {
	children: ReactNode;
};

const Auth: VFC<Props> = memo(({ children }) => {
	const router = useRouter();
	const [user, setUser] = useRecoilState(userState);

	console.log(user);
	useEffect(() => {
		if (!user.isSignedIn) {
			listenAuthState(router, user, setUser);
		}
	}, []);

	return <>{children}</>;
});

export default Auth;
