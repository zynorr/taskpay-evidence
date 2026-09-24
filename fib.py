#!/usr/bin/env python3
"""fib.py

A simple command‑line utility that prints the first N Fibonacci numbers.

Usage:
    python fib.py N

where N is a non‑negative integer. The script will output the sequence
starting with 0, one number per line.

The module also provides a ``fib`` function that returns the list of the first
N Fibonacci numbers – useful for importing from other code or for unit tests.
"""

import sys
from typing import List


def fib(n: int) -> List[int]:
    """Return a list containing the first *n* Fibonacci numbers.

    The sequence starts with 0, 1, 1, 2, ...
    An empty list is returned for ``n <= 0``.
    """
    if n <= 0:
        return []
    if n == 1:
        return [0]
    # start with the first two numbers
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]


def _main() -> None:
    if len(sys.argv) != 2:
        print("Usage: python fib.py N", file=sys.stderr)
        sys.exit(1)
    try:
        n = int(sys.argv[1])
        if n < 0:
            raise ValueError
    except ValueError:
        print("Error: N must be a non‑negative integer", file=sys.stderr)
        sys.exit(1)

    for number in fib(n):
        print(number)


if __name__ == "__main__":
    _main()
