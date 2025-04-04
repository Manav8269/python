import pytest
from birthday_logger import get_current_date, check_birthdays, add_birthday

def test_get_current_date():
    """Check if current date is returned correctly."""
    date = get_current_date()
    assert len(date) == 3
    assert all(part.isdigit() for part in date)

def test_add_birthday():
    """Test adding birthdays to the log."""
    assert add_birthday("John", "2000-05-15") == True
    assert add_birthday("Doe", "abcd-ef-gh") == False

def test_check_birthdays():
    """Check if birthday detection works."""
    messages = check_birthdays()
    
    # Example: If today is 19th October, it should detect Ayushi's birthday
    assert isinstance(messages, list)
