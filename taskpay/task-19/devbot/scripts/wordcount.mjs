#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { exit, argv, stderr, stdout } from 'node:process';

/**
 * Count word occurrences in a string and return the top N words.
 * Words are sequences of alphanumeric characters (\w) and are treated case‑insensitively.
 * @param {string} text – Input text.
 * @param {number} [limit=5] – Number of top entries to return.
 * @returns {[string, number][]} Array of [word, count] sorted by descending count then alphabetically.
 */
export function getTopWordsFromText(text, limit = 5) {
  const matches = text.match(/\b\w+\b/g);
  const freq = new Map();
  if (matches) {
    for (const w of matches) {
      const word = w.toLowerCase();
      freq.set(word, (freq.get(word) ?? 0) + 1);
    }
  }
  const sorted = [...freq.entries()].sort((a, b) => {
    // Primary: count descending
    if (b[1] !== a[1]) return b[1] - a[1];
    // Secondary: alphabetical
    return a[0].localeCompare(b[0]);
  });
  return sorted.slice(0, limit);
}

async function main() {
  const filePath = argv[2];
  if (!filePath) {
    stderr.write('Usage: wordcount <file>\n');
    exit(1);
  }
  try {
    const data = await readFile(filePath, 'utf8');
    const top = getTopWordsFromText(data);
    for (const [word, count] of top) {
      stdout.write(`${word}: ${count}\n`);
    }
  } catch (err) {
    stderr.write(`Error: Cannot read file '${filePath}': ${err.message}\n`);
    exit(1);
  }
}

// Detect if the module is executed directly (not imported)
if (process.argv[1] === new URL(import.meta.url).pathname) {
  main();
}
