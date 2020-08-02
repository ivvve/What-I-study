import java.time.LocalDateTime
import java.util.*
import kotlin.collections.HashMap

class LFUCache(capacity: Int) {
    private val capacity = capacity
    private var size = 0

    private val queue: PriorityQueue<CacheValue>
    private val store = HashMap<Int, CacheValue>()

    init {
        this.queue = PriorityQueue()
    }

    fun get(key: Int): Int {
        val cacheValue = store[key]
        cacheValue?.call()
        return cacheValue?.value ?: -1
    }

    fun put(key: Int, value: Int) {
        if (this.store.containsKey(key)) {
            // 새로 집어 넣기
            return
        }

        if (this.isStoreFull()) {
            val cacheValue = queue.poll()
            this.store.remove(cacheValue.key)
        }

        val cacheValue = CacheValue(key, value)
        this.store[key] = cacheValue
        this.queue.add(cacheValue)
    }

    fun isStoreFull(): Boolean {
        return this.size == this.capacity
    }
}

class CacheValue(key: Int, value: Int) : Comparable<CacheValue> {
    val key = key
    val value = value

    private var callCount = 0
    private var usedAt = LocalDateTime.now()

    fun call() {
        this.callCount++
        this.usedAt = LocalDateTime.now()
    }

    override fun compareTo(other: CacheValue): Int {
        return this.descending(other)
    }

    private fun ascending(other: CacheValue): Int {
        if (this.callCount != other.callCount) {
            return this.callCount.compareTo(other.callCount)
        }

        return this.usedAt.compareTo(other.usedAt)

    }

    private fun descending(other: CacheValue): Int {
        return -this.ascending(other)
    }
}

fun main() {
    val cache = LFUCache(3)
    cache.put(1, 11)
    if (cache.get(1) != 11) {
        throw Exception()
    }

    cache.put(2, 22)
    if (cache.get(2) != 22) {
        throw Exception()
    }

    cache.put(3, 33)
    if (cache.get(3) != 33) {
        throw Exception()
    }

    cache.put(4, 44)
    if (cache.get(4) != 44) {
        throw Exception()
    }

    if (cache.get(1) != -1) {
        throw Exception()
    }
}