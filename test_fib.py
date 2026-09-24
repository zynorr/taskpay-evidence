import pytest
from fib import fib

def test_fib_first_ten():
    expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
    assert fib(10) == expected
