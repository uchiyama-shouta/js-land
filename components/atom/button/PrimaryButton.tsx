import { memo, ReactNode, VFC } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
	children: ReactNode;
	disabled?: boolean;
	onClick?: () => void;
	onSubmit?: any;
	type?: "button" | "submit";
};

const useStyles = makeStyles({
	button: {
		backgroundColor: "#1976d2",
		height: 48,
		fontSize: 16,
		marginBottom: 16,
		width: 256,
		"&:hover": {
			backgroundColor: "#1976d2",
			opacity: 0.8,
		},
	},
});

const PrimaryButton: VFC<Props> = memo((props) => {
	const {
		children,
		disabled = false,
		onClick = null,
		onSubmit = null,
		type = "button",
	} = props;
	const classes = useStyles();
	return (
		<Button
			className={classes.button}
			variant="contained"
			color="primary"
			disabled={disabled}
			onClick={() => onClick()}
			onSubmit={onSubmit}
			type={type}
		>
			{children}
		</Button>
	);
});

export default PrimaryButton;
