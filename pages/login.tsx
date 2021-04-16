import React, { useCallback, useEffect, useState, VFC } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { userState } from "../src/store/userState";
import Layout from "../components/templates/layout/Layout";
import TextInput from "../components/atom/TextInput";

import styles from "../styles/components/pages/login.module.css";
import PrimaryButton from "../components/atom/button/PrimaryButton";
import { auth } from "../src/firebase";
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
		auth.onAuthStateChanged((user) => {
			user && router.push("/");
		});
	}, []);

	const onSubmitlogin = async (e) => {
		e.preventDefault();
		login(email, password, router, setUsers);
	};

	return (
		<>
			<Layout description="ログイン画面です。">
				<h2 className={styles.title}>Login</h2>
				<div className={styles.textInput}>
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
						<div className="spacer" />
						<div className={styles.center}>
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
			<style jsx>{`
				.spacer {
					height: 50px;
				}
			`}</style>
		</>
	);
};

export default Login;
