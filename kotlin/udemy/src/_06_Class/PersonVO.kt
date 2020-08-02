package _06_Class

data class PersonVO(
        val name: String,
        val address: String,
        val age: Int
)

fun main() {
    val person = PersonVO("devson", "Seoul", 29)
    val (name, address, age) = PersonVO("devson", "Seoul", 29)

    val inchoenMan = person.copy(address = "Inchoen")
    println(inchoenMan)
}