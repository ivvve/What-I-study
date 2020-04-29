package _05_Function

fun add(a: Int, b: Int): Int {
    return a + b
}

fun minus(a: Int, b: Int): Int {
    return a - b
}

fun shortMinus(a: Int, b: Int) = a - b

// 기본적으로 아무런 access modifier를 사용하지 않으면 public
private fun privateFunction(a: Int) {
    println(a)
}

fun addNumbers(a: Int, b: Int, c: Int = 0): Int {
    return a + b + c
}

fun main() {
    // parameter의 순서를 변경할 수도 있다
    shortMinus(b = 1, a = 2)

    addNumbers(1, 2, 3)
    addNumbers(1, 2)
}
