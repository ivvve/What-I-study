from abc import *


class Car(metaclass=ABCMeta):
    def __init__(self, model=None):
        self.model = model

    @abstractmethod
    def run(self):
        pass


class TeslaCar(Car):
    def __init__(self, model='Model S'):
        super().__init__(model)

    def run(self):
        print('Tesla {} is running'.format(self.model))


TeslaCar().run()
