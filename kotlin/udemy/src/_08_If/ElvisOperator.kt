package _08_If

import java.util.*

fun main() {
    val ww = canBeNull() ?: 1
}

fun canBeNull(): Int? {
    return if (Random().nextBoolean()) 1 else null
}