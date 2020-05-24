# Pointer Receiver

```go
package main

import "fmt"

func main() {
	car := Car{100}

	car.newTopSpeed(200)
	fmt.Println(car) // 200

    // Pointer를 받지 않으면 내부 필드에 접근할 수 없어 변경이 없다
    car.newTopSpeedNoPointer(300)
    fmt.Println(car) // 200
}

type Car struct {
	topSpeed float64
}

// pointer를 사용해야 struct의 field에 직접적으로 접근할 수 있다
func (c *Car) newTopSpeed(newSpeed float64) {
	c.topSpeed = newSpeed
}

func (c Car) newTopSpeedNoPointer(newSpeed float64) {
	c.topSpeed = newSpeed
}
```

```go
package main

import "fmt"

func main() {
	car := Car{100}
	newCar := newerTopSpeed(car, 500)

	fmt.Println(car) // 100
	fmt.Println(newCar) // 500
}

type Car struct {
	topSpeed float64
}

// 기존의 car는 유지한채 새로운 Car를 생성할 수 있다
func newerTopSpeed(car Car, newSpeed float64) Car {
	car.topSpeed = newSpeed
	return car
}
```