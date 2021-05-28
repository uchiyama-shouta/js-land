import React, { memo, VFC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { userState } from "../../../src/store/userState";
import { UserStateType } from "../../../types/user/UserStateType";

const DrawerList: VFC = memo(() => {
	const [user, setUser] = useRecoilState<UserStateType>(userState);
	const router = useRouter();

	return (
		<div className="w-64" role="presentation">
			<List>
				<ListItem button>
					<Link href="/lesson">
						<a className="w-full">
							<ListItemText primary="レッスン一覧" />
						</a>
					</Link>
				</ListItem>
				<ListItem button>
					<Link href="/blog">
						<a className="w-full">
							<ListItemText primary="ブログ" />
						</a>
					</Link>
				</ListItem>
				<hr className="h-px mx-0 bg-gray-300 border-none flex-shrink-0" />
				{user.isSignedIn && (
					<>
						<ListItem button>
							<ListItemText
								primary="ログアウト"
								onClick={async () =>
									await import("../../../lib/user/logOut").then((mod) =>
										mod.logOut(setUser, router)
									)
								}
							/>
						</ListItem>
						{user.role === "administrator" && (
							<ListItem button>
								<Link href="/edit">
									<a className="w-full">
										<ListItemText primary="編集" />
									</a>
								</Link>
							</ListItem>
						)}
					</>
				)}
			</List>
		</div>
	);
});

export default DrawerList;
