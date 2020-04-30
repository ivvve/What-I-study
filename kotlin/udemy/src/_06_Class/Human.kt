package _06_Class

class Human (
        var name: String,
        var age: Int
){
    var address: String

    get() {
        return field
    }

    val nextAge // dummy variable
    get() = this.age + 1

    init {
        this.address = "Unknown"
    }

    constructor(name: String, address: String, age: Int): this(name, age) {
        this.address = address
    }

    override fun toString(): String {
        return "Human(name='$name', age=$age, address='$address')"
    }

    // Static methods
    companion object {
        fun getInstance() = Human("Static", 20)
    }

    /**
     * Platform declaration clash: The following declarations have the same JVM signature (getName()Ljava/lang/String;):
     */
//    fun getName: String {
//        return this.name
//    }

}

fun main() {
    val human = Human("devson", "Seoul", 30)
    println(human.nextAge)

    Human.getInstance()
}
