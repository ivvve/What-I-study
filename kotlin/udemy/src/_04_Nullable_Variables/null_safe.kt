package _04_Nullable_Variables

fun main() {
    var name: String? = null

    println(name?.toUpperCase())
//    if (name == null) {
//        println(name) // null
//    } else {
//        println(name.toUpperCase())
//    }
}
