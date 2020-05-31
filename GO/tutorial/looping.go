package main

import "fmt"

// while은 없고 for 만으로 처리한다
func main() {
	basicFor()
	fmt.Println("--------")
	basicFor2()
	fmt.Println("--------")
	breakLoop()
	fmt.Println("--------")
	rangeLoop()
}

func basicFor() {
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}
}

func basicFor2() {
	i := 0

	for i < 10 {
		fmt.Println(i)
		i++
	}
}

func infiniteLoop() {
	for {
		fmt.Println("do not run this func")
	}
}

func breakLoop() {
	i := 0
	for {
		if i < 10 {
			fmt.Println(i)
		} else {
			break
		}

		i++
	}
}

func rangeLoop() {
	nums := []int{2, 3, 4}

	for i, num := range nums {
		fmt.Println("i", i)
		fmt.Println("num", num)
	}
}
