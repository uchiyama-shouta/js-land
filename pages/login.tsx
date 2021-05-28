import React, { useCallback, useEffect, useState, VFC } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { userState } from "../src/store/userState";
import Layout from "../components/templates/layout/Layout";
import TextInput from "../components/atom/TextInput";

import PrimaryButton from "../components/atom/button/PrimaryButton";
import { login } from "../lib/user/login";

const Login: VFC = () => {
	const router = useRouter();
	const setUsers = useSetRecoilState(userState);
	const [email, setEmail] = useState("");
	const inputEmail = useCallback((e) => {
		setEmail(e.target.value);
	}, []);

	const [password, setPassword] = useState("");
	const inputPassword = useCallback((e) => {
		setPassword(e.target.value);
	}, []);

	useEffect(() => {
		import("../src/firebase")
			.then((mod) => mod.auth)
			.then((auth) => {
				auth.onAuthStateChanged((user) => {
					user && router.push("/");
				});
			});
	}, []);

	const onSubmitlogin = async (e) => {
		e.preventDefault();
		const login = await import("../lib/user/login").then((mod) => mod.login);
		login(email, password, router, setUsers);
	};

	return (
		<>
			<Layout description="ログイン画面です。">
				<h2 className="text-center mt-5 text-3xl">Login</h2>
				<div className="text-center h-auto w-screen-2rem mx-auto my-8 p-4 max-w-sm">
					<form onSubmit={onSubmitlogin}>
						<TextInput
							rows={1}
							value={email}
							label="メールアドレス"
							onChange={inputEmail}
							type="email"
						/>
						<TextInput
							rows={1}
							value={password}
							label="パスワード"
							onChange={inputPassword}
							type="password"
						/>
						<div className="h-12" />
						<div className="text-center">
							<PrimaryButton
								disabled={(!email || !password) && true}
								type="submit"
								onClick={() => console.log("login")}
							>
								ログイン
							</PrimaryButton>
						</div>
					</form>
				</div>
			</Layout>
		</>
	);
};

export default Login;
