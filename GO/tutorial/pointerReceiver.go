package main

import "fmt"

func main() {
	car := Car{100}

	car.newTopSpeed(200)
	fmt.Println(car)

	car.topSpeed = 2
	fmt.Println(car)

	fmt.Println("-----")

	newCar := newerTopSpeed(car, 500)
	fmt.Println(car)
	fmt.Println(newCar)
}

type Car struct {
	topSpeed float64
}

// pointer를 사용해야 struct의 field에 직접적으로 접근할 수 있다
func (c *Car) newTopSpeed(newSpeed float64) {
	c.topSpeed = newSpeed
}

// 기존의 car는 유지한채 새로운 Car를 생성할 수 있다
func newerTopSpeed(car Car, newSpeed float64) Car {
	car.topSpeed = newSpeed
	return car
}
