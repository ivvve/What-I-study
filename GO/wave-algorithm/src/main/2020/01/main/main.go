// https://www.hackerrank.com/challenges/kangaroo/problem

package main

import (
	"bufio"
	"fmt"
	"io"
	"math"
	"os"
	"strconv"
	"strings"
)

func kangaroo(x1 int32, v1 int32, x2 int32, v2 int32) string {
	// if start at the same location
	if x1 == x2 {
		return "YES"
	}

	if x2 < x1 {
		x1 = x2
		v1 = v2
	}

	// if can't reachable
	if (x1 < x2) && (v1 <= v2) {
		return "NO"
	}

	// if pass front kangaroo without being in the same location
	// if solution of the equation is integer then they'll meet at the same location in the end
	solutionOfEquation := float64(x2 - x1) / float64(v1 - v2)

	if solutionOfEquation != math.Trunc(solutionOfEquation) {
		return "NO"
	}
	
	return "YES"
}

func main() {
	println(kangaroo(0, 3, 4, 2))

	reader := bufio.NewReaderSize(os.Stdin, 1024 * 1024)

	stdout, err := os.Create(os.Getenv("OUTPUT_PATH"))
	checkError(err)

	defer stdout.Close()

	writer := bufio.NewWriterSize(stdout, 1024 * 1024)

	x1V1X2V2 := strings.Split(readLine(reader), " ")

	x1Temp, err := strconv.ParseInt(x1V1X2V2[0], 10, 64)
	checkError(err)
	x1 := int32(x1Temp)

	v1Temp, err := strconv.ParseInt(x1V1X2V2[1], 10, 64)
	checkError(err)
	v1 := int32(v1Temp)

	x2Temp, err := strconv.ParseInt(x1V1X2V2[2], 10, 64)
	checkError(err)
	x2 := int32(x2Temp)

	v2Temp, err := strconv.ParseInt(x1V1X2V2[3], 10, 64)
	checkError(err)
	v2 := int32(v2Temp)

	result := kangaroo(x1, v1, x2, v2)

	fmt.Fprintf(writer, "%s\n", result)

	writer.Flush()
}

func readLine(reader *bufio.Reader) string {
	str, _, err := reader.ReadLine()
	if err == io.EOF {
		return ""
	}

	return strings.TrimRight(string(str), "\r\n")
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}
