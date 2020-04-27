package _04_Nullable_Variables

fun main() {
    var name: String? = null

    // Non-Null Asserted Operator
    val result = name!!.toString() // throws exception

    println(result)
}
