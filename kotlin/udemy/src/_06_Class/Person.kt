package _06_Class

class Person {
    val name: String
    val address: String
    val age: Int

    constructor(name: String, address: String, age: Int) {
        this.name = name
        this.address = address
        this.age = age
    }

    // constructor overloading
    constructor(name: String, age: Int) {
        this.name = name
        this.address = "Unknown"
        this.age = age
    }
}

class Person2(
        val name: String,
        val address: String,
        val age: Int
) {
    init {
        println("init block")
    }

    // constructor overloading
    constructor(name: String, age: Int) : this(name, "Unknown", age) {
        println("Secondary constructor block")
    }
}

fun main() {
    val person2 = Person2("devson", 30)
    // init block
    // Secondary constructor block
    println("${person2.name} is living in ${person2.address}")
}
