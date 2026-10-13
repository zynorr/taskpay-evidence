import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { getTopWordsFromText } from '../scripts/wordcount.mjs';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

describe('getTopWordsFromText', () => {
  test('returns top words sorted by count then alphabetically', () => {
    const text = 'apple banana apple orange banana apple grape orange banana';
    const top = getTopWordsFromText(text);
    assert.deepEqual(top, [
      ['apple', 3],
      ['banana', 3],
      ['orange', 2],
      ['grape', 1],
    ]);
  });

  test('is case‑insensitive', () => {
    const text = 'Dog dog DOG cat CAT';
    const top = getTopWordsFromText(text);
    assert.deepEqual(top, [
      ['dog', 3],
      ['cat', 2],
    ]);
  });
});

describe('CLI behaviour', () => {
  test('exits with code 1 and clear message when file does not exist', async () => {
    const scriptPath = fileURLToPath(new URL('../scripts/wordcount.mjs', import.meta.url));
    const child = spawn('node', [scriptPath, 'nonexistent.txt']);
    let stderr = '';
    for await (const chunk of child.stderr) {
      stderr += chunk;
    }
    const exitCode = await new Promise((resolve) => child.on('close', resolve));
    assert.equal(exitCode, 1);
    assert.match(stderr, /Error: Cannot read file 'nonexistent\.txt'/);
  });
});
