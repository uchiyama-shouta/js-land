import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = memo(() => {
	return (
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
	);
});

export default Logo;
