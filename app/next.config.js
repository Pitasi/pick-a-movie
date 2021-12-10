/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
	reactStrictMode: true,
	images: {
		domains: ["image.tmdb.org"],
	},
});
