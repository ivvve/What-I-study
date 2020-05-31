package main

import "fmt"

func main() {
	array()
	fmt.Println("-------------")
	slice()
}

func array() {
	// 크기를 지정해준다
	arr1 := [4]int{1, 2, 3}
	fmt.Println(arr1)

	// array 크기 자동 지정
	arr2 := [...]int{1, 2, 3, 4, 5}
	fmt.Println(arr2)

	// slicing
	arr3 := arr2[1:3]
	fmt.Println(arr3)

	// iterating
	for i, num := range arr3 {
		fmt.Println(i, num)
	}
}

func slice() {
	// array에 기초하지만 고정된 크기를 미리 지정하지 않을 수 있고 동적으로 변경 가능하다
	slice1 := []int{1, 2, 3} // literal assigning
	fmt.Println(slice1)

	slice2 := make([]int, 5, 10) // length 5, capacity 10
	fmt.Println(slice2)          // [0, 0, 0, 0, 0]
	//fmt.Println(slice2[7]) // panic: out of range

	fmt.Println(len(slice2), cap(slice2))

	// appending
	slice3 := append([]int{1}, 2, 3, 4)
	fmt.Println(slice3)
	fmt.Println(len(slice3), cap(slice3)) // 4, 4

	// copy
	slice4 := make([]int, len(slice3), cap(slice3)*2)
	copy(slice4, slice3)
	fmt.Println(slice4)
}
