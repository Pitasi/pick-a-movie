import {
	Links,
	LinksFunction,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./tailwind.css";

export const meta: MetaFunction = () => {
	return { title: "Pick a movie" };
};

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
	return (
		<html lang="en" className="text-white">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="container mx-auto px-4 bg-gray-900">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}
