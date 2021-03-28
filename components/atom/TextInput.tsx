import TextField from "@material-ui/core/TextField";
import { memo, VFC } from "react";

type Props = {
	label: string;
	type?: string;
	multiline?: boolean;
	fullWidth?: boolean;
	value: string;
	onChange: (any) => void;
};

const BasicTextFields: VFC<Props> = memo((props) => {
	const { label, type, multiline, value, onChange } = props;
	return (
		<TextField
			label={label}
			margin="dense"
			type={type}
			multiline={multiline}
			fullWidth
			value={value}
			onChange={onChange}
		/>
	);
});

export default BasicTextFields;
