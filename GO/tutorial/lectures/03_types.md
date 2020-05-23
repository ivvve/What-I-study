1. 할당

```go
// 아래 코드는 모두 같은 코드다
func main() {
	// var num1 = 5.6
	// var num2 = 9.5

	// var num1, num2 = 5.6, 9.5

	num1, num2 := 5.6, 9.5
}
```

할당만 하고 사용하지 않을 경우 compile에러가 난다.

2. function argument, return

```go
//func add(x float64, y float64) float64 {
func add(x, y float64) float64 { // x, y 둘 다 float64 type
	return x + y
}

func multiple(a, b string) (string, string) { // return이 2개면 ()로 감싸야한다
	return a, b
}
```

3. type casting

```go
const intValue int = 1
const floatValue float64 = float64(intValue)
```