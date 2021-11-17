export interface ResultProps {
	title: string;
	onClick: () => void;
}

const Result = ({ title, onClick }: ResultProps) => (
	<a onClick={onClick}>{title}</a>
);

export default Result;
