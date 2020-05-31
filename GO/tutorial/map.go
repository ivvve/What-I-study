package main

import "fmt"

func main() {
	var map1 map[string]string
	fmt.Println(map1) // Nil Map
	//map1["Son"] = "Chris" //panic: assignment to entry in nil map

	// used Literal
	map1 = map[string]string{
		"Son": "Chris",
		"You": "Iris",
		"Kim": "Erin",
	}

	// used make
	map1 = make(map[string]string)

	// set
	map1["Son"] = "Chris"
	map1["You"] = "Iris"
	map1["Kim"] = "Erin"

	// get
	son, exists := map1["Son"]
	fmt.Println(son)    // Chris
	fmt.Println(exists) // true

	// delete
	delete(map1, "Son")
	fmt.Println(map1["Son"]) // (nothing print)

	// iterating
	for key, val := range map1 {
		fmt.Println(key, val)
	}
}
