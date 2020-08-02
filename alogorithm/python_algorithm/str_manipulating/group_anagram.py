import collections

arr = ["eat", "tea", "tan", "ate", "nat", "bat"]

anagrams = collections.defaultdict(list)

for word in arr:
    anagram = ''.join(sorted(word))
    anagrams[anagram].append(word)

print(anagrams.values())