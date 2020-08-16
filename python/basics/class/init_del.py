class Person:
    def __init__(self, name='Chris'):
        self.name = name
        print('Person Initialized')

    def __del__(self):
        print('Person destroyed')


p = Person('devson')
print(p.name)
del p
print('-------')
