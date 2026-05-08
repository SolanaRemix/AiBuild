import nextConfig from "eslint-config-next/core-web-vitals"

const base = Array.isArray(nextConfig) ? nextConfig : Object.values(nextConfig)

/** @type {import('eslint').Linter.Config[]} */
const config = [...base]

export default config
