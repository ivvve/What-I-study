package chap2_observable;

import io.reactivex.Observable;

public class _observable_create {
    public static void main(String[] args) {
        Observable.create(emitter -> {
            for (int i = 10; i <= 100; i+=10) {
                emitter.onNext(i);
            }
            emitter.onComplete();
        }).subscribe(System.out::println);
    }
}
