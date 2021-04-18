import { Dispatch, memo, SetStateAction, useCallback, VFC } from "react";
import { storage } from "../../src/firebase";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const useStyles = makeStyles({
	icon: {
		marginRight: 8,
		height: 45,
		width: 45,
	},
});

type Props = {
	image: "" | { id: string | ""; path: string | "" } | { id: ""; path: "" };
	setImage: Dispatch<SetStateAction<any>>;
};

const ImageArea: VFC<Props> = memo((props) => {
	const classes = useStyles();
	const uploadImage = useCallback(
		(e) => {
			const file = e.target.files;
			let blob = new Blob(file, { type: "image/jpeg" });

			// Generate random 16 digits strings
			const S =
				"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			const N = 16;
			const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
				.map((n) => S[n % S.length])
				.join("");

			const uploadRef = storage.ref("images").child(fileName);
			const uploadTask = uploadRef.put(blob);

			uploadTask
				.then(() => {
					uploadTask.snapshot.ref
						.getDownloadURL()
						.then((downloadURL: string) => {
							const newImage = { id: fileName, path: downloadURL };
							props.setImage(newImage);
						});
				})
				.catch(() => {});
		},
		[props.setImage]
	);
	return (
		<>
			<div>
				{props.image ? (
					<img
						className="preview-image"
						src={props.image.path}
						alt="プレビュー"
					/>
				) : (
					<div className="no-image" />
				)}
				<div className="text-right">
					<span>サムネイル画像の登録する</span>
					<IconButton className={classes.icon}>
						<label>
							<AddPhotoAlternateIcon />
							<input
								className="none"
								type="file"
								id="image"
								onChange={(e) => {
									uploadImage(e);
								}}
							/>
						</label>
					</IconButton>
				</div>
			</div>
			<style jsx>{`
				.text-right {
					text-align: right;
					width: 380px;
				}
				.none {
					display: none;
				}
				.preview-image {
					width: 80%;
					margin: 0 auto;
				}
				.no-image {
					width: 80%;
					height: 200px;
					margin: 0 auto;
					background-color: #ddd;
				}
				@media screen and (max-width: 480px) {
					.text-right {
						text-align: center;
						width: 350px;
					}
				}
			`}</style>
		</>
	);
});

export default ImageArea;
