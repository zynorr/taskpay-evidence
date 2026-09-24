// test/validate.test.mjs
// Node.js built‑in test runner for validate.mjs

import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let tempDir;

beforeEach(async () => {
  tempDir = await mkdtemp(join(tmpdir(), 'validate-test-'));
});

afterEach(async () => {
  await rm(tempDir, { recursive: true, force: true });
});

/** Helper to run the CLI with a given config object */
async function runValidate(configObj) {
  const configPath = join(tempDir, 'config.json');
  await writeFile(configPath, JSON.stringify(configObj), 'utf8');

  return new Promise((resolve) => {
    const child = spawn('node', ['validate.mjs', configPath]);
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('close', (code) => {
      resolve({ code, stdout: stdout.trim(), stderr: stderr.trim() });
    });
  });
}

describe('validate.mjs CLI', async () => {
  await test('accepts a valid configuration', async () => {
    const cfg = { host: 'example.com', port: 443, tls: true };
    const result = await runValidate(cfg);
    assert.equal(result.code, 0);
    assert.equal(result.stdout, '');
    assert.equal(result.stderr, '');
  });

  await test('reports missing and invalid fields', async () => {
    const cfg = { host: 123, port: 70000, tls: 'yes' };
    const result = await runValidate(cfg);
    assert.equal(result.code, 1);
    const lines = result.stdout.split('\n').sort();
    const expected = [
      'host: must be a string',
      'port: must be an integer between 1 and 65535',
      'tls: must be a boolean',
    ].sort();
    assert.deepEqual(lines, expected);
    assert.equal(result.stderr, '');
  });

  await test('fails to parse invalid JSON', async () => {
    // Write malformed JSON directly
    const configPath = join(tempDir, 'bad.json');
    await writeFile(configPath, '{"host": "example.com", "port": 80,', 'utf8'); // truncated
    return new Promise((resolve) => {
      const child = spawn('node', ['validate.mjs', configPath]);
      let stdout = '';
      let stderr = '';
      child.stdout.on('data', (d) => (stdout += d));
      child.stderr.on('data', (d) => (stderr += d));
      child.on('close', (code) => {
        assert.equal(code, 2);
        assert.match(stderr, /Invalid JSON/);
        resolve();
      });
    });
  });
});
