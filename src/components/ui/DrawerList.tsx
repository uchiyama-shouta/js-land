import { memo, VFC } from "react";
import Link from "next/link";

const DrawerList: VFC = memo(() => {
  return (
    <div className="w-64" role="presentation">
      <ul className="py-2 px-0 m-0">
        <li className="transition-all hover:bg-gray-100">
          <Link href="/about">
            <a className="px-4 py-3 w-full text-base font-normal leading-normal block">
              About
            </a>
          </Link>
        </li>
        <li className="transition-all hover:bg-gray-100">
          <Link href="/blog">
            <a className="px-4 py-3 w-full text-base font-normal leading-normal block">
              ブログ
            </a>
          </Link>
        </li>

        <hr className="h-px mx-0 bg-gray-300 border-none flex-shrink-0" />

        {/* {user.isSignedIn && (
					<>
						<li className="transition-all hover:bg-gray-100">
							<span
								className="px-4 py-3 w-full text-base font-normal leading-normal block"
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
							<li className="transition-all hover:bg-gray-100">
								<Link href="/edit">
									<a className="px-4 py-3 w-full text-base font-normal leading-normal block">
										編集
									</a>
								</Link>
							</li>
						)}
					</>
				)} */}
      </ul>
    </div>
  );
});

export default DrawerList;
