package _02_Strings

fun main() {
//    val name = "devson"

    // String template
//    println("Hello \$name")
//    println("Name length is ${name.length}")

    // Multi line string
    val story ="""
		|Hello.
		|This is the story about a developer.
	""".trimMargin("|")
    println(story)
}
