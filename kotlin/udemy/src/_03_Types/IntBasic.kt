package _03_Types

fun main() {
    val intValue = 30

    println("doubleValue is Int?? ${intValue is Int}")
    println("doubleValue is ${intValue::class.qualifiedName}")

    println("javaClass is ${intValue.javaClass}") // kotlin Int는 Java int로 compile 된다
}