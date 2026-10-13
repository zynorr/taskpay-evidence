# WordCount CLI

A tiny Node.js command‑line tool that reads a text file, counts how many times each word appears, and prints the **top 5** words with their counts.

## Usage

```bash
node scripts/wordcount.mjs <path‑to‑file>
```

The output is a list of `word: count` lines, ordered by descending frequency (and alphabetically for ties). Example:

```text
the: 27
and: 22
of: 19
to: 15
a: 13
```

### Error handling
- If the file path is missing or the file cannot be read, the tool writes an error message to **stderr** and exits with status code **1**.

## Running the tests

The project uses the built‑in `node:test` module – no external test runner is required.

```bash
node test/wordcount.test.mjs
```

Three unit tests are provided:
1. Verifies that the top‑5 sorting logic works.
2. Checks case‑insensitivity of the word counting.
3. Confirms the CLI exits with code 1 and a clear error message when the file does not exist.

## Implementation notes
- Words are defined as sequences of alphanumeric characters (`\w`).
- Counting is case‑insensitive; all words are lower‑cased before tallying.
- The core logic (`getTopWordsFromText`) is exported so it can be unit‑tested directly.

## License

MIT – feel free to use, modify, and distribute.
