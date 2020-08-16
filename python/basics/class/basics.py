class Person:
    kind = 'human'  # class field

    def __init__(self, name):
        self.name = name
        print('Person({}) initialized'.format(self.name))

    @classmethod
    def what_is_your_kind(cls):
        print(cls.kind)

    @staticmethod # classmethod 사용을 추천 https://hamait.tistory.com/635
    def about():
        print('About human')

    def hello(self):
        print("I'm {}".format(self.name))

    def __del__(self):
        print('Person({}) destroyed'.format(self.name))


person1 = Person('Chris')
person1.hello()
del person1
print('end')

print('--------------')

person2 = Person('devson')
print(person2.kind)

print('--------------')

Person.what_is_your_kind()
Person.about()
