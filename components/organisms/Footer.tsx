import { VFC } from "react";

const Footer: VFC = () => {
	return (
		<>
			<footer>
				<p>&copy; 2021 Design and created by Shouta Uchiyama</p>
			</footer>
			<style jsx>{`
            p {
               text-align: center;
               line-height: 65px;
               color: #444;
            }
         `}</style>
		</>
	);
};

export default Footer;
