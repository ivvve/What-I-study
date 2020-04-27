package _03_Types

fun main() {
    val floatValue: Float = 3.43f
    println(floatValue + 3)

    println("floatValue is ${floatValue::class.qualifiedName}")
    println("javaClass is ${floatValue.javaClass}")
}