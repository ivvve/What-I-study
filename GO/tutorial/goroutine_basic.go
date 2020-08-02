package main

import (
	"fmt"
	"time"
)

//func main() {
//	go func() {
//		fmt.Println("Go!") // 아마 실행이 안된다
//	}()
//
//	fmt.Println("main end")
//}

func main() {
	channel := make(chan string)

	go hello10Times(channel)

	fmt.Println(<- channel)
}

func hello10Times(channel chan string) {
	for i := 0; i < 10; i++ {
		channel <- "Hello"
		time.Sleep(100)
	}
}
