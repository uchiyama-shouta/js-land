import { memo, VFC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import { userState } from "../../../src/store/userState";
import { UserStateType } from "../../../types/user/UserStateType";

const DrawerList: VFC = memo(() => {
	const [user, setUser] = useRecoilState<UserStateType>(userState);
	const router = useRouter();

	return (
		<div className="w-64" role="presentation">
			<ul className="py-2 px-0 m-0">
				<li className="px-4 py-2 transition-all hover:bg-gray-100">
					<Link href="/lesson">
						<a className="w-full">
							<span className="my-1 text-base font-normal leading-normal block">
								レッスン一覧
							</span>
						</a>
					</Link>
				</li>
				<li className="px-4 py-2 transition-all hover:bg-gray-100">
					<Link href="/blog">
						<a className="w-full">
							<span className="my-1 text-base font-normal leading-normal block">
								ブログ
							</span>
						</a>
					</Link>
				</li>
				
				<hr className="h-px mx-0 bg-gray-300 border-none flex-shrink-0" />
				
				{user.isSignedIn && (
					<>
						<li className="px-4 py-2 transition-all hover:bg-gray-100">
							<span
								className="my-1 text-base font-normal leading-normal block"
								onClick={async () =>
									await import("../../../lib/user/logOut").then((mod) =>
										mod.logOut(setUser, router)
									)
								}
							>
								ログアウト
							</span>
						</li>
						{user.role === "administrator" && (
							<li className="px-4 py-2 transition-all hover:bg-gray-100">
								<Link href="/edit">
									<a className="w-full">
										<span className="my-1 text-base font-normal leading-normal block">
											編集
										</span>
									</a>
								</Link>
							</li>
						)}
					</>
				)}
			</ul>
		</div>
	);
});

export default DrawerList;
