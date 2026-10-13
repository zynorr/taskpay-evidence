# csvsum

A tiny, **dependency‑free** Node.js CLI that reads a CSV file and prints per‑column statistics as JSON.

## Installation

```bash
# Clone the repo (or copy the files into your project)
git clone https://github.com/owner/repo.git
cd repo
```

Make sure you have Node.js (v18+) installed.

## Usage

```bash
node scripts/csvsum.mjs <path-to-csv>
```

The script prints a JSON object to **stdout**.  Errors are written to **stderr** and cause an exit code of `1`.

### Output format

* **Numeric columns** – `min`, `max`, `mean`, `count`
* **Text columns** – `distinct` (number of unique values) and `top` – an array of up to three most frequent values with their counts.

Example:

```json
{
  "age": {
    "type": "numeric",
    "count": 3,
    "min": 21,
    "max": 45,
    "mean": 33.666666666666664
  },
  "city": {
    "type": "text",
    "distinct": 2,
    "top": [
      { "value": "New York", "count": 2 },
      { "value": "Los Angeles", "count": 1 }
    ]
  }
}
```

### Failure modes

| Situation | Message (stderr) | Exit code |
|-----------|------------------|-----------|
| File does not exist | `Error: File not found – <path>` | 1 |
| File is empty | `Error: CSV file is empty.` | 1 |
| Row has fewer columns than the header | `Error: Row <n> has fewer columns than header.` | 1 |

## Testing

The test suite uses the built‑in `node:test` module and does not require any third‑party packages.

Run the tests with:

```bash
node test/csvsum.test.mjs
```

The suite covers:

1. Numeric column summarisation
2. Text column summarisation (distinct values and top‑3 frequencies)
3. Detection of a ragged row (fewer columns than header)

## License

MIT – feel free to copy, modify, and redistribute.
