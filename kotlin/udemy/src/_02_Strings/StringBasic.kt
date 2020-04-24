package _02_Strings

fun main() {
    val name = "devson"

    // String template
    println("Hello $name")
    println("Name length is ${name.length}")

    // Multi line string
    val story = """It was a dark and stormy night
        |A foul smell crept across the city.
        |The End.""".trimMargin("|")
    println(story)
}