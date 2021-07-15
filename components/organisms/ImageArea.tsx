import { Dispatch, memo, SetStateAction, useCallback, VFC } from "react";
import { storage } from "../../src/firebase";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { createId } from "../../lib/function/createRandomId";

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

			const fileName = createId();

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
		<div>
			{props.image ? (
				<img
					className="mx-auto w-4/5"
					src={props.image.path}
					alt="プレビュー"
				/>
			) : (
				<div className="mx-auto w-4/5 h-52 bg-gray-300" />
			)}
			<div className="sm:text-right sm:w-96 w-80 text-center">
				<span>サムネイル画像の登録する</span>
				<IconButton className={classes.icon}>
					<label>
						<AddPhotoAlternateIcon />
						<input
							className="hidden"
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
	);
});

export default ImageArea;
