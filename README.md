# Config Validator CLI

A minimal command‑line tool that validates a JSON configuration file against a very small schema:

- **host** – must be a string
- **port** – must be an integer between **1** and **65535**
- **tls**  – must be a boolean

If any of the fields are missing or have the wrong type/value, the tool prints one line per violation and exits with code **1**. If the file is valid it exits with code **0**. Errors such as missing files or malformed JSON cause an exit code **2** and a message on `stderr`.

## Installation

```bash
# Clone the repository
git clone https://github.com/owner/repo.git
cd repo

# Install (no dependencies required, but npm scripts are provided)
npm install
```

## Usage

```bash
node validate.mjs path/to/config.json
```

### Example

```json
{
  "host": "example.com",
  "port": 443,
  "tls": true
}
```

```bash
$ node validate.mjs config.json
$ echo $?
0
```

If the file contains errors:

```json
{
  "host": 123,
  "port": 70000,
  "tls": "yes"
}
```

```bash
$ node validate.mjs bad.json
host: must be a string
port: must be an integer between 1 and 65535
tls: must be a boolean
$ echo $?
1
```

## Testing

The project includes three test cases written with Node's built‑in `node:test` module.

Run them with:

```bash
npm test
```

The tests cover:

1. A completely valid configuration (expects exit code 0).
2. A configuration where **all** fields are invalid (expects exit code 1 and three messages).
3. A malformed JSON file (expects exit code 2 and an error on `stderr`).

## License

MIT © Koda
