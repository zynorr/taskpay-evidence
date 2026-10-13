#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function errorExit(message) {
  console.error(message);
  process.exit(1);
}

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter(l => l.length > 0);
  if (lines.length === 0) {
    errorExit('Error: CSV file is empty.');
  }
  const header = lines[0].split(',');
  const colCount = header.length;
  const columns = header.map(name => ({ name, values: [] }));

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    if (row.length < colCount) {
      errorExit('Error: Row ' + (i + 1) + ' has fewer columns than header.');
    }
    for (let j = 0; j < colCount; j++) {
      columns[j].values.push(row[j]);
    }
  }
  return columns;
}

function summarize(columns) {
  const result = {};
  for (const col of columns) {
    const { name, values } = col;
    // Determine if numeric: every non‑empty value parses to a finite number
    const numeric = values.every(v => v === '' || !isNaN(v) && isFinite(v));
    if (numeric) {
      const nums = values.filter(v => v !== '').map(v => Number(v));
      const count = nums.length;
      const sum = nums.reduce((a, b) => a + b, 0);
      const min = Math.min(...nums);
      const max = Math.max(...nums);
      const mean = count === 0 ? null : sum / count;
      result[name] = { type: 'numeric', count, min, max, mean };
    } else {
      const freqMap = new Map();
      for (const v of values) {
        const key = v;
        freqMap.set(key, (freqMap.get(key) || 0) + 1);
      }
      const distinct = freqMap.size;
      const top = Array.from(freqMap.entries())
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 3)
        .map(([value, count]) => ({ value, count }));
      result[name] = { type: 'text', distinct, top };
    }
  }
  return result;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    errorExit('Usage: csvsum.mjs <path-to-csv>');
  }
  const csvPath = resolve(args[0]);
  if (!existsSync(csvPath)) {
    errorExit(`Error: File not found – ${csvPath}`);
  }
  const content = readFileSync(csvPath, 'utf8');
  if (content.trim().length === 0) {
    errorExit('Error: CSV file is empty.');
  }
  const columns = parseCSV(content);
  const summary = summarize(columns);
  console.log(JSON.stringify(summary, null, 2));
}

main();
