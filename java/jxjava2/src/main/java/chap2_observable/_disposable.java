package chap2_observable;

import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;

public class _disposable {
    public static void main(String[] args) {
        final Observable<String> source = Observable.just("RED", "GREEN", "YELLO");

        final Disposable disposable = source.subscribe(
                data -> System.out.println("onNext: " + data),
                error -> System.out.println("onError: " + error.getMessage()),
                () -> System.out.println("onComplete")
        );

        System.out.println("isDisposed(): " + disposable.isDisposed());
    }
}
