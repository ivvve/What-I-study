package _06_Class

class Customer {
    val name = "devson"
    val address = "Seoul"
    val age = 30
}

fun main() {
    val customer = Customer()
    println("${customer.name} is ${customer.age}-year-old guy")
}
