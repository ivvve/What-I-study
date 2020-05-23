package main

import "fmt"

//func add(x float64, y float64) float64 {
func add(x, y float64) float64 { // x, y 둘 다 float64 type
	return x + y
}

func multiple(a, b string) (string, string) { // return이 2개면 ()로 감싸야한다
	return a, b
}

func main() {
	//var num1 = 5.6
	//var num2 = 9.5

	//var num1, num2 = 5.6, 9.5

	num1, num2 := 5.6, 9.5
	fmt.Println(add(num1, num2))

	w1, w2 := "Hello", "World"
	fmt.Println(multiple(w1, w2))

	const intValue int = 1
	const floatValue float64 = float64(intValue)
}
