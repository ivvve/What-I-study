package _03_Types

fun main() {
    val doubleValue = 21.4

    println("doubleValue is Double?? ${doubleValue is Double}")
    println("doubleValue is ${doubleValue::class.qualifiedName}")

    println("javaClass is ${doubleValue.javaClass}") // kotlin Double는 Java double로 compile 된다
}