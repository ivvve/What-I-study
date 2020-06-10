package main

import (
	"bufio"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"
)

func main() {
	success := false

	rand.Seed(time.Now().Unix()) // 난수 생성기 seed / 없으면 rand.Intn은 항상 고정된 값을 리턴한다
	target := rand.Intn(100) + 1

	for i := 0; i < 10; i++ {
		inputNumber, err := getInputNumber()

		if err != nil {
			log.Fatal(err)
			panic(err)
		}

		if inputNumber == target {
			success = true
			break
		} else if inputNumber < target {
			fmt.Println("Oops Your guess was LOW.")
		} else if inputNumber > target {
			fmt.Println("Oops Your guess was HIGH.")
		}
	}

	if success {
		fmt.Println("Good job! You guessed it!")
	} else {
		fmt.Println(fmt.Sprintf("Sorry. You didn't guess my number. It was: [%d]", target))
	}
}

func getInputNumber() (int, error) {
	reader := bufio.NewReader(os.Stdin)
	input, err := reader.ReadString('\n')

	if err != nil {
		return 0, err
	}

	input = strings.TrimSpace(input)
	inputNumber, err := strconv.ParseInt(input, 0, 64)

	if err != nil {
		return 0, err
	}

	if (inputNumber < 0) || (100 < inputNumber) {
		return 0, errors.New("Number must be between 1 and 100")
	}

	return int(inputNumber), err
}
