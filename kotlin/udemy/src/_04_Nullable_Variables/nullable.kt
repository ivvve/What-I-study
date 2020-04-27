package _04_Nullable_Variables

fun main() {
//    var name: String = null // compile error
    var name: String? = null // can be null

    if (name != null) {
        println(name[0])
    }

//    name[1] // compile error
    name = "H"
    name[1]
}
