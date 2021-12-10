export interface ResultProps {
	title: string;
	onClick: () => void;
	disabled: boolean;
}

const Result = ({ title, onClick, disabled }: ResultProps) => (
	<button onClick={onClick} disabled={disabled}>
		{title}
	</button>
);

export default Result;
