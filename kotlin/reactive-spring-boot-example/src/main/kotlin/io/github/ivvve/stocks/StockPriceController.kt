package io.github.ivvve.stocks

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import java.time.Duration
import java.time.LocalDateTime
import java.util.concurrent.ThreadLocalRandom

@RestController()
@RequestMapping("/stocks")
class StockPriceController {
    @GetMapping(value = ["/{symbol}"], produces= [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun prices(@PathVariable symbol: String): Flux<StockPrice> {
        return Flux.interval(Duration.ofSeconds(1))
                .map { StockPrice(symbol, this.getRandomMoney(), LocalDateTime.now()) }
    }

    private fun getRandomMoney(): Double {
        return ThreadLocalRandom.current().nextDouble(100.0);
    }
}