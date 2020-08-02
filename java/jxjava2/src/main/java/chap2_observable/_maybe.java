package chap2_observable;

import io.reactivex.Maybe;
import io.reactivex.Observable;

public class _maybe {
    public static void main(String[] args) {
//        final Maybe<Object> maybe = Observable.empty().firstElement();
//        final Maybe<Integer> maybe = Observable.just(1).singleElement();
        final Maybe<Integer> maybe = Observable.just(1, 2, 3).lastElement();

        maybe.subscribe(System.out::println);
    }
}
