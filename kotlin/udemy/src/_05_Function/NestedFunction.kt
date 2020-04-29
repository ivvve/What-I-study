package _05_Function

fun main() {
    outter()
}

fun outter() {
    val a = 1

    fun inner() {
        println(a)
    }

    inner()
}
