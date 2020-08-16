class Person:
    def talk(self):
        print('Talk')

    def run(self):
        print('Person run')


class Car:
    def run(self):
        print('Car run')


class PersonCarRobot(Person, Car): # 다중 상속 지원
    def fly(self):
        print('Fly')


personCarRobot = PersonCarRobot()
personCarRobot.fly()
personCarRobot.run() # 먼저 상속 받은 것을 사용한다
personCarRobot.talk()
