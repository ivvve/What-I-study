package io.github.ivvve.kboot.theater

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class TheaterController {

    @GetMapping
    fun seatBookingView(model: Model): String {
        model.addAttribute("bean", CheckAvailabilityBookingBean())

        return "seatBooking"
    }

    @ResponseBody
    @PostMapping("checkAvailability")
    fun checkAvailability(bean: CheckAvailabilityBookingBean, model: Model): String {
        return "seatBooking"
    }
}

class CheckAvailabilityBookingBean {
    val seatNums = 1..36
    val seatRows = 'A'..'O'
    var selectedSeatNum = 1
    var selectedSeatRow = 'A'
    var result = ""
}
