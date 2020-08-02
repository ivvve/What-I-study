package io.github.ivvve;

import io.vavr.Tuple;
import io.vavr.Tuple2;

// https://www.vavr.io/vavr-docs/#_tuples
public class TupleExample {
    public static void main(String[] args) {
        example1();

        System.out.println("---------------");

        example2();

        System.out.println("---------------");

        example3();
    }

    static void example1() {
        final Tuple2<String, Integer> java = Tuple.of("Java", 8);
        System.out.println(java._1);
        System.out.println(java._2);
    }

    static void example2() {
        final Tuple2<String, Integer> java = Tuple.of("Java", 8);

//        final Tuple2<String, Integer> vavr = java.map(
//                s -> s.substring(2) + "vr",
//                i -> i / 8
//        );

        final Tuple2<String, Integer> vavr = java.map(
                (s, i) -> Tuple.of(s.substring(2) + "vr", i / 8)
        );

        System.out.println(vavr);
    }

    static void example3() {
        final Tuple2<String, Integer> java = Tuple.of("Java", 8);

        final String vavr = java.apply(
                (s, i) -> s.substring(2) + "vr " + (i / 8)
        );

        System.out.println(vavr);
    }
}
