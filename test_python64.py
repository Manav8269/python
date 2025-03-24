import pytest
import python64

def test_birthday_log():
    assert isinstance(python64.bday_log, list)
    assert len(python64.bday_log) > 0  # Ensuring birthdays exist
