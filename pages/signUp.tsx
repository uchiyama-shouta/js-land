import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/templates/layout/Layout";

import TextInput from "../components/atom/TextInput";
import PrimaryButton from "../components/atom/button/PrimaryButton";
import { auth } from "../src/firebase";
import { createUser } from "../lib/user/createUser";

const signUp = () => {
	const router = useRouter();
	const [name, setName] = useState("");
	const inputName = useCallback((e) => {
		setName(e.target.value);
	}, []);
	const [email, setEmail] = useState("");
	const inputEmail = useCallback((e) => {
		setEmail(e.target.value);
	}, []);

	const [password, setPassword] = useState("");
	const inputPassword = useCallback((e) => {
		setPassword(e.target.value);
	}, []);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			user && router.push("/");
		});
	}, []);

	const signUp = async (e) => {
		e.preventDefault();
		createUser(router, name, email, password);
	};
	return (
		<Layout description="アカウント登録画面です。">
			<h2 className="text-center mt-5 text-3xl">Sign Up</h2>
			<div className="text-center h-auto w-[calc(100%-2rem)] mx-auto my-8 p-4 max-w-sm">
				<form onSubmit={signUp}>
					<TextInput
						rows={1}
						value={name}
						label="名前"
						onChange={inputName}
						type="text"
					/>
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
							onClick={() => console.log("sigiup")}
						>
							新規登録
						</PrimaryButton>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default signUp;
