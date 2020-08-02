package chap2_observable;

import io.reactivex.Observable;

import java.util.concurrent.Executors;

public class _observable_from {
    public static void main(String[] args) {
        Observable.fromCallable(() -> {
            Thread.sleep(1000);
            return "fromCallable data";
        }).subscribe(System.out::println);

        Observable.fromFuture(Executors.newSingleThreadExecutor().submit(() -> {
            Thread.sleep(500);
            return "fromFuture data";
        })).subscribe(System.out::println);

        Observable.fromPublisher(subscriber -> {
            subscriber.onNext("fromPublisher");
            subscriber.onComplete();
        }).subscribe(System.out::println);
    }
}
