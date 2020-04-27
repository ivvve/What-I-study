package _03_Types

import java.util.*

fun main() {
    val result: Any

    // 일반적인 언어의 삼항연산자와는 다르다
    result = if (Random().nextBoolean()) "Hello" else 1234

    println("Result is $result")

    if (result is String) {
        println(result.substring(0, 1)) // Smart Casting
    } else {
        println(result as Int + 3) // casting은 `as`로 한다
    }
}
