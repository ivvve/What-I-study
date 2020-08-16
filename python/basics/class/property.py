class Car(object):
    def __init__(self, model=None):
        self.__model = model  # __로 시작하면 외부 접근 불가

    @property
    def model(self):
        return self.__model

    @model.setter
    def model(self, model):
        self.__model = model


tesla = Car('Tesla Model S')
print(tesla.model)
tesla.model = 'Kia K7'
print(tesla.model)
