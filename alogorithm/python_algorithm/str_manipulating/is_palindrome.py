import re

def is_palindrome(s: str) -> bool:
    s = s.lower()
    s = re.sub('[^a-z0-9]', '', s)
    return s == s[::-1]

print(is_palindrome('abcB:::A'))
print(is_palindrome('abcda'))
