package _03_Types

import java.math.BigDecimal

fun main() {
    // new가 필요없다
    val bigValue = BigDecimal(16)

    // `val`은 immutable인데 assign이 되는 것은
    // kotlin에서는 변수에 값이 assign이 되기 전엔 사용될 수 없다.
    val bigValue2: BigDecimal

//    println(bigValue2) // compile error
    bigValue2 = BigDecimal(30)

    if (bigValue < bigValue2) {
        println(bigValue2)
    } else {
        println(bigValue)
    }
}