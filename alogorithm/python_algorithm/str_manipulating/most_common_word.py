import collections
import re

paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
banned = ["hit"]

words = [word for word in re.sub("[^a-zA-Z]", " ", paragraph)
    .lower().split()
        if word not in banned]

# most_common 가장 많이 나오는거 1개만
print(collections.Counter(words).most_common(1)[0][0])