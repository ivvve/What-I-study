package _07_Practices

import java.util.*

class Person(
        val id: Long,
        val title: String,
        val firstName: String,
        val surname: String,
        val dateOfBirth: Calendar?
) {
    val age: Int
        get() {
            return getAge(this.dateOfBirth)
        }

    companion object {
        fun getAge(dateOfBirth: Calendar?): Int {
            if (dateOfBirth == null) {
                return -1;
            }

            val today = GregorianCalendar()
            val years = today.get(Calendar.YEAR) - dateOfBirth.get(Calendar.YEAR)

            if (today.get(Calendar.YEAR) <= dateOfBirth.get(Calendar.DAY_OF_YEAR)) {
                return years - 1
            }

            return years
        }
    }

    override fun toString() = "${this.title} ${this.firstName} ${this.surname}"

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Person

        if (id != other.id) return false
        if (title != other.title) return false
        if (firstName != other.firstName) return false
        if (surname != other.surname) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + title.hashCode()
        result = 31 * result + firstName.hashCode()
        result = 31 * result + surname.hashCode()
        return result
    }
}

fun main() {
    val john = Person(1, "Mr", "John", "Blue", GregorianCalendar(1977, 9, 3))
    val jane = Person(2, "Mrs", "Jane", "Green", null)

    println("${john}'s age is ${john.age}")
    println("${jane}'s age is ${jane.age}")
    println("The age of someone born on 3rd May 1988 is ${Person.getAge(GregorianCalendar(1988, 5, 3))}")
}