package main

import "fmt"

func main() {
	x := 15
	a := &x // memory address of x

	fmt.Println(a)  // 0xc00001e0c0
	fmt.Println(*a) // 15

	*a = 5          // reference를 바꾼다
	fmt.Println(x)  // 5
	fmt.Println(*a) // 5
}
