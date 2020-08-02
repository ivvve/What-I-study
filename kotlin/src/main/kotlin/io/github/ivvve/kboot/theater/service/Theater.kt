package io.github.ivvve.kboot.theater.service

import io.github.ivvve.kboot.theater.domain.Seat
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class Theater {
//
//    private val hiddenSeats = mutableListOf<Seat>()
//
//    constructor() {
//
//        fun getPrice(row: Char, num: Int) : BigDecimal {
//            return when {
//                row >=14 -> BigDecimal(14.50)
//                num <=3 || num >= 34 -> BigDecimal(16.50)
//                row == 1 -> BigDecimal(21)
//                else -> BigDecimal(18)
//            }
//
//        }
//
//        fun getDescription(row: Int, num: Int) : String {
//            return when {
//                row == 15 -> "Back Row"
//                row == 14 -> "Cheaper Seat"
//                num <=3 || num >= 34 -> "Restricted View"
//                row <=2 -> "Best View"
//                else -> "Standard Seat"
//            }
//        }
//
//        for (row in 'A'..'O') {
//            for (num in 1..36) {
//                hiddenSeats.add(Seat(row, num, getPrice(row,num), getDescription(row,num) ))
//            }
//        }
//    }
//
//	val seats
//    get() = hiddenSeats.toList()
//
//    fun find(num: Int, row: Char): Seat? {
//        return this.seats.filter { it.num == num && it.row == row }.first();
//    }
}
