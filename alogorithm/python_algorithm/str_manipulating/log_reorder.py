# 1. 로그의 가장 앞 부분은 식별자
# 2. 문자로 구성된 로그가 우선
# 3. 문자가 동일한 경우 식별자 순
# 4. 숫자 로그는 입력 순
logs = ["dig1 8 1 5 1", "let1 art can", "dig2 3 6", "let2 own kit dig", "let3 art zero"]

letters, digits = [], []

for log in logs:
    if log.split()[1].isdigit():
        digits.append(log)
    else:
        letters.append(log)

print(letters)
print(digits)

letters.sort(key=lambda x: (x.split()[1:], x.split()[0]))
print(letters)

# arr = [(0, 0), (0, 1), (1, 2), (1, 0), (0, -1)]
# arr.sort(key=lambda x: (x[0], x[1]), reverse=True) # [(1, 2), (1, 0), (0, 1), (0, 0), (0, -1)]
# print(arr)