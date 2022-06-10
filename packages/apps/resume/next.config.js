/** @format */

require("dotenv").config()
const path = require("path")
const withPlugins = require("next-compose-plugins")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
	openAnalyzer: process.env.ANALYZE === "true",
})
const isProduction = process.env.NODE_ENV === "production"

const BASE_PREFIX_FOR_APP = isProduction ? "/dv-ui" : ""

const nextConfig = {
	env: {},
	poweredByHeader: false,
	assetPrefix: BASE_PREFIX_FOR_APP,

	publicRuntimeConfig: {
		BASE_PREFIX_FOR_APP: BASE_PREFIX_FOR_APP,
	},
	webpack: (config, _options) => {
		config.resolve.alias = {
			...config.resolve.alias,
			_: path.join(__dirname),
			_components: path.join(__dirname, "components"),
			_pages: path.join(__dirname, "pages"),
			_contexts: path.join(__dirname, "contexts"),
			_hooks: path.join(__dirname, "hooks"),
			_store: path.join(__dirname, "store"),
			_constants: path.join(__dirname, "constants"),
			_public: path.join(__dirname, "public"),
			_testUtils: path.join(__dirname, "testUtils"),
		}
		config.resolve.extensions.push(...[".ts", ".tsx"])
		return config
	},
}

module.exports = withPlugins([withBundleAnalyzer], nextConfig)
