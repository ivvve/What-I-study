package _2020._01;

import java.util.*;

// https://leetcode.com/problems/fizz-buzz/
public class _30_FizzBuzz {
    public static void main(String[] args) {
        System.out.println(new _30_FizzBuzz().fizzBuzz(15));
    }

    public List<String> fizzBuzz(final int n) {
        final List<String> results = new ArrayList<>(n);

        for (int i = 1; i <= n; i++) {
            results.add(this.getResult(i));
        }

        return results;
    }

    private String getResult(final int n) {
        if (n % 15 == 0) {
            return "FizzBuzz";
        }

        if (n % 3 == 0) {
            return "Fizz";
        }

        if (n % 5 == 0) {
            return "Buzz";
        }

        return String.valueOf(n);
    }
}
