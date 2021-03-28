import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/templates/layout/Layout";

import styles from "../styles/components/signup.module.css";
import TextInput from "../components/atom/TextInput";
import PrimaryButton from "../components/atom/button/PrimaryButton";
import { auth } from "../src/firebase";

const signUp = () => {
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

	const createUser = async (e) => {
		e.preventDefault();
		try {
			await auth.createUserWithEmailAndPassword(email, password);
			router.push("/login");
		} catch (err) {
			alert(err.message);
		}
	};
	return (
		<>
			<Layout>
				<h2 className={styles.title}>Sign Up</h2>
				<div className={styles.textInput}>
					<form onSubmit={createUser}>
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
                        onClick={() => console.log('sigiup')}
							>
								新規登録
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

export default signUp;
