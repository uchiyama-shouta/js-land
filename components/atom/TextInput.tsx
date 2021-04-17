import TextField from "@material-ui/core/TextField";
import { memo, VFC } from "react";

type Props = {
	label: string;
	type?: string;
	multiline?: boolean;
	fullWidth?: boolean;
	value: string | number;
	rows?: number;
	onChange: (any) => void;
};

const BasicTextFields: VFC<Props> = memo((props) => {
	const {
		label,
		type,
		multiline,
		value,
		onChange,
		fullWidth = true,
		rows = 1,
	} = props;
	return (
		<TextField
			label={label}
			margin="dense"
			type={type}
			multiline={multiline}
			fullWidth={fullWidth}
			value={value}
			onChange={onChange}
			rows={rows}
		/>
	);
});

export default BasicTextFields;
