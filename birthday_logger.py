import datetime
import time

# Get current date
def get_current_date():
    """Returns the current date as a list [YYYY, MM, DD]."""
    return datetime.date.today().strftime('%Y-%m-%d').split('-')

# Predefined birthday log
bday_log = [
    ('Ayushi', ('1999', '10', '19')),
    ('Yash', ('1999', '04', '21')),
]

def add_birthday(name, date):
    """Adds a birthday to the log if the format is correct."""
    date_parts = tuple(date.split('-'))
    
    if len(date_parts) == 3 and all(part.isdigit() for part in date_parts):
        bday_log.append((name, date_parts))
        return True
    return False

def check_birthdays():
    """Checks if today is someone's birthday and returns messages."""
    current_date_lst = get_current_date()
    messages = []

    for birthday in bday_log:
        if current_date_lst[1] == birthday[1][1] and current_date_lst[2] == birthday[1][2]:
            age = int(current_date_lst[0]) - int(birthday[1][0])
            
            # Determine ordinal suffix (st, nd, rd, th)
            if 11 <= age % 100 <= 13:
                ordinal_suffix = "th"
            else:
                ordinal_suffix = {1: "st", 2: "nd", 3: "rd"}.get(age % 10, "th")

            birthday_message = f"🎉 Happy {age}{ordinal_suffix} Birthday, {birthday[0]}!"
            messages.append(birthday_message)
    
    return messages

if __name__ == "__main__":
    log_file = "birthday_log.txt"

    # Ask user to add a birthday
    add = input('To add a birthday, type y: ').strip().lower()
    if add.startswith('y'):
        new_date = input('Enter birthday (YYYY-MM-DD): ').strip()
        name = input("Enter the person's name: ").strip()
        if not add_birthday(name, new_date):
            print("❌ Invalid date format. Please enter in YYYY-MM-DD format.")

    print("\n🎂 Birthday logger is running... Press CTRL+C to stop.\n")
    
    try:
        while True:
            messages = check_birthdays()
            current_time = datetime.datetime.now().strftime('%H:%M:%S')

            # Log to file
            with open(log_file, "a") as log:
                for msg in messages:
                    print(f"{current_time} - {msg}")
                    log.write(f"{current_time}: {msg}\n")

            time.sleep(3)
    except KeyboardInterrupt:
        print("\n🎂 Birthday logger stopped.")
