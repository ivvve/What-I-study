package chap2_observable;

import io.reactivex.Observable;
import io.reactivex.observables.ConnectableObservable;

import java.util.concurrent.TimeUnit;

public class _connectable_observable {
    public static void main(String[] args) {
        final ConnectableObservable<Integer> publish = Observable
                .interval(1L, TimeUnit.SECONDS)
                .just(1, 2, 3, 4)
                .publish();

        publish.subscribe(data -> System.out.println("#1: " + data));
        publish.subscribe(data -> System.out.println("#2: " + data));

        publish.connect();

        publish.subscribe(data -> System.out.println("#3: " + data));
    }
}
