package main

import "fmt"

const uint64Max float64 = 65535
const kmhMultiple float64 = 1.60934

func main() {
	aCar := car{
		gasPedal:      65000,
		brakePedal:    0,
		steeringWheel: 12561,
		topSpeedKmh:   225.0,
	}

	// aCar = car{2234, 0, 12561, 225.0}

	fmt.Println(aCar)
	fmt.Println(aCar.kmh())
	fmt.Println(aCar.mph())
}

// class
type car struct {
	gasPedal      uint16 // 0 ~ 2^16
	brakePedal    uint16
	steeringWheel int16 // -2^15 ~ 2^15
	topSpeedKmh   float64
}

// method
func (c car) kmh() float64 {
	return float64(c.gasPedal) * (c.topSpeedKmh / uint64Max)
}

func (c car) mph() float64 {
	return float64(c.gasPedal) * (c.topSpeedKmh / uint64Max / kmhMultiple)
}
