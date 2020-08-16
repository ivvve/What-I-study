class Word(object):
    def __init__(self, text):
        self.text = text

    def __str__(self):  # toString
        return 'word: {}'.format(self.text)

    def __len__(self):
        return len(self.text)

    def __add__(self, other):
        return Word(self.text + other.text)

    def __eq__(self, other):
        return self.text == other.text


word = Word('Chris')
print(word)
print(len(word))

print('--------')
print(Word('Hello ') + word)

print('--------')

print(word == Word('Chris'))
print(word == Word('Chris2'))
