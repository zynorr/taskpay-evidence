// csvsum unit tests – run with `node test/csvsum.test.mjs`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, unlinkSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scriptPath = path.resolve(fileURLToPath(import.meta.url), '..', '..', 'scripts', 'csvsum.mjs');

function runCsvSum(csvContent) {
  const tmpFile = path.join(path.dirname(scriptPath), `tmp_${Date.now()}.csv`);
  writeFileSync(tmpFile, csvContent);
  return new Promise((resolve) => {
    execFile('node', [scriptPath, tmpFile], (error, stdout, stderr) => {
      // Clean up
      try { unlinkSync(tmpFile); } catch {}
      resolve({ error, stdout, stderr });
    });
  });
}

test('numeric column summarisation', async () => {
  const csv = `a,b,c\n1,2,3\n4,5,6\n7,8,9`;
  const { stdout, stderr, error } = await runCsvSum(csv);
  assert.strictEqual(stderr, '');
  assert.strictEqual(error, null);
  const out = JSON.parse(stdout);
  assert.deepStrictEqual(out.a, { type: 'numeric', count: 3, min: 1, max: 7, mean: 4 });
  assert.deepStrictEqual(out.b, { type: 'numeric', count: 3, min: 2, max: 8, mean: 5 });
  assert.deepStrictEqual(out.c, { type: 'numeric', count: 3, min: 3, max: 9, mean: 6 });
});

test('text column summarisation', async () => {
  const csv = `name,city\nAlice,NY\nBob,LA\nAlice,NY\nCharlie,NY\nBob,LA`;
  const { stdout, stderr, error } = await runCsvSum(csv);
  assert.strictEqual(stderr, '');
  assert.strictEqual(error, null);
  const out = JSON.parse(stdout);
  // name column
  assert.strictEqual(out.name.type, 'text');
  assert.strictEqual(out.name.distinct, 3);
  assert.deepStrictEqual(out.name.top, [
    { value: 'Alice', count: 2 },
    { value: 'Bob', count: 2 },
    { value: 'Charlie', count: 1 }
  ]);
  // city column
  assert.strictEqual(out.city.type, 'text');
  assert.strictEqual(out.city.distinct, 2);
  assert.deepStrictEqual(out.city.top, [
    { value: 'NY', count: 3 },
    { value: 'LA', count: 2 }
  ]);
});

test('ragged row triggers error', async () => {
  const csv = `a,b\n1,2\n3`;
  const { stdout, stderr, error } = await runCsvSum(csv);
  // Expect a non‑zero exit code
  assert.ok(error, 'Process should exit with error');
  assert.match(stderr, /Error: Row 3 has fewer columns than header/);
  assert.strictEqual(stdout, '');
});
