import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = memo(() => {
	return (
		<h1 className="flex-grow">
			<Link href="/">
				<a>
					<Image
						id="logo"
						width={95}
						height={15}
						alt="ロゴ"
						src="/image/logo_transparent.png"
					/>
				</a>
			</Link>
		</h1>
	);
});

export default Logo;
