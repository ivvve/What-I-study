package _2020._02;

import java.util.ArrayList;
import java.util.List;

public class _06_Count_Prime {

    public static void main(String[] args) {
        System.out.println(new _06_Count_Prime().countPrimes(10));
    }

    private List<Integer> primes = new ArrayList<>();

    public int countPrimes(final int n) {
        if (n <= 2) {
            return 0;
        }

        int count = 1;

        for (int i = 3; i < n; i++) {

            if (this.isPrime(i)) {
                this.primes.add(i);
                count++;
            }
        }

        return count;
    }

    private boolean isPrime(final int n) {
        final boolean notPrime = this.primes.parallelStream()
                .filter(prime -> (n % prime == 0))
                .findAny()
                .isPresent();

        if (notPrime) {
            return false;
        }

        for (int i = 2; i < n; i++) {

            if (n % i == 0) {
                return false;
            }
        }

        return true;
    }
}