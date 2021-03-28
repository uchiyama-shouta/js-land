import React, { useCallback, useEffect, useState, VFC } from "react";
import { useRouter } from "next/router";
import Layout from "../components/templates/layout/Layout";
import TextInput from "../components/atom/TextInput";

import styles from "../styles/components/login.module.css";
import PrimaryButton from "../components/atom/button/PrimaryButton";
import { auth } from "../src/firebase";

const Login: VFC = () => {
	const router = useRouter();
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

	const login = async (e) => {
		e.preventDefault();
		try {
			await auth.signInWithEmailAndPassword(email, password);
			router.push("/");
		} catch (err) {
			alert(err.message);
		}
	};

	return (
		<>
			<Layout>
				<h2 className={styles.title}>Login</h2>
				<div className={styles.textInput}>
					<form onSubmit={login}>
						<TextInput
							value={email}
							label="メールアドレス"
							onChange={inputEmail}
							type="email"
						/>
						<TextInput
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
								onClick={() => console.log('login')}
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
