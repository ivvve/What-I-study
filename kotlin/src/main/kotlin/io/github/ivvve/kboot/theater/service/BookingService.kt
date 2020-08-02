package io.github.ivvve.kboot.theater.service

import io.github.ivvve.kboot.theater.domain.Seat
import org.springframework.stereotype.Service

@Service
class BookingService {
    fun isSeatFree(seat: Seat): Boolean {
        return true
    }
}
