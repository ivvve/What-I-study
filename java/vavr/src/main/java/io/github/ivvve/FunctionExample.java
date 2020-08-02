package io.github.ivvve;

import io.vavr.Function2;
public class FunctionExample {

    public static void main(String[] args) {
        example1();

        System.out.println("----------");

        example2();
    }

    static void example1() {
        final Function2<Integer, Integer, Integer> sum = (a, b) -> a + b;
        final int result = sum.apply(1, 2).intValue();
        System.out.println(result);
    }

    static void example2() {
        final Function2<Integer, Integer, Integer> sum = Function2.of(FunctionExample::sumMethod);
        final int result = sum.apply(3, 4).intValue();
        System.out.println(result);
    }

    static int sumMethod(final int a, final int b) {
        return a + b;
    }
}
