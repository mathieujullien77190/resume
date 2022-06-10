/** @format */

import { loadEnvConfig } from "@next/env"

const setupEnv = async () => {
	const projectDir = process.cwd()
	loadEnvConfig(projectDir)
}

export default setupEnv