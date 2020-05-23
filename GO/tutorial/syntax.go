package main

import (
	"fmt"
	"math"
	"math/rand"
)

func foo() {
	fmt.Println("The square root of 4 is", math.Sqrt(4))
	//math.rand 이런식으로는 쓸 수 없다
	println("A number from 1-100", rand.Intn(100))
}

func main() {
	foo()
}

// go의 모듈은 소문자이고 메서드는 PascalCase이다.
// main은 호출되지 않지만 애플리케이션이 처음 시작하는 함수이다.
