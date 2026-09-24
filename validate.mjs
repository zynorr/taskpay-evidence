// validate.mjs
// CLI tool to validate a JSON config against an embedded schema.
// Schema: { host: string, port: integer 1-65535, tls: boolean }

import { readFile } from 'node:fs/promises';
import { exit } from 'node:process';

/**
 * Validate the config object.
 * @param {any} config Parsed JSON configuration.
 * @returns {string[]} Array of violation messages (empty if none).
 */
function validateConfig(config) {
  const violations = [];

  // host must be a string
  if (typeof config.host !== 'string') {
    violations.push('host: must be a string');
  }

  // port must be an integer between 1 and 65535
  if (typeof config.port !== 'number' || !Number.isInteger(config.port) || config.port < 1 || config.port > 65535) {
    violations.push('port: must be an integer between 1 and 65535');
  }

  // tls must be a boolean
  if (typeof config.tls !== 'boolean') {
    violations.push('tls: must be a boolean');
  }

  return violations;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node validate.mjs <path-to-config.json>');
    exit(2);
  }

  const configPath = args[0];
  let raw;
  try {
    raw = await readFile(configPath, { encoding: 'utf8' });
  } catch (err) {
    console.error(`Failed to read file: ${err.message}`);
    exit(2);
  }

  let config;
  try {
    config = JSON.parse(raw);
  } catch (err) {
    console.error(`Invalid JSON: ${err.message}`);
    exit(2);
  }

  const violations = validateConfig(config);
  for (const v of violations) {
    console.log(v);
  }

  exit(violations.length > 0 ? 1 : 0);
}

await main();
