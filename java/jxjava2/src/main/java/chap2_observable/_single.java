package chap2_observable;

import io.reactivex.Observable;
import io.reactivex.Single;

public class _single {
    public static void main(String[] args) {
        Single.just("Single data")
                .subscribe(System.out::println);

        System.out.println("1-------------");

        Observable.empty()
                .single("default")
                .subscribe(System.out::println);

        System.out.println("2-------------");

        Observable.just(1, 2, 3)
                .take(1)
                .single(100)
                .subscribe(System.out::println);
    }
}
