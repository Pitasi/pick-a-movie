import { FC } from "react";
import { Link } from "remix";
import { User } from "~/utils/session.server";

export interface HeaderProps {
	user?: User;
	redirectTo?: string;
}

const Header: FC<HeaderProps> = ({ user, redirectTo }) => {
	return (
		<header className="flex flex-col items-center justify-between gap-6 p-8 md:p-16 md:flex-row">
			<section>
				<p className="text-3xl">🎬 Pick a movie</p>
			</section>

			<section className="text-xl">
				{user === undefined ? (
					<Link
						to={`/login${
							redirectTo ? "?redirectTo=" + encodeURIComponent(redirectTo) : ""
						}`}
					>
						Login
					</Link>
				) : (
					<p>{user?.email}</p>
				)}
			</section>
		</header>
	);
};

export default Header;
