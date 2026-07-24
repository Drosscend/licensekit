import pkg from "../package.json";

/**
 * Single source of truth for the version displayed by the CLI. The bundler
 * inlines it at build time, and the build runs before every publish, so the
 * value can never drift from the published package.
 */
export const VERSION: string = pkg.version;
