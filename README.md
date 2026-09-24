# Fibonacci Printer (`fib.py`)

A tiny utility that prints the first **N** Fibonacci numbers, one per line.

## Files

- `fib.py` – the main script. It can be executed directly from the command line
  or imported as a module.
- `test_fib.py` – a pytest suite containing a single sanity check that the
  `fib` function returns the correct first ten numbers.
- `README.md` – this documentation.

## Usage

```bash
python fib.py 10
```

Will output:

```
0
1
1
2
3
5
8
13
21
34
```

## API

```python
from fib import fib

numbers = fib(5)   # -> [0, 1, 1, 2, 3]
```

The function returns a list; for ``n <= 0`` it returns an empty list.

## Testing

Run the test with pytest:

```bash
pytest test_fib.py
```

The test asserts that ``fib(10)`` matches the known first ten Fibonacci numbers.
