package chap2_observable;

import io.reactivex.subjects.AsyncSubject;

public class _subject {
    public static void main(String[] args) {
        final AsyncSubject<Object> subject = AsyncSubject.create();

        subject.subscribe(data -> System.out.println("#1 Subscriber: " + data));

        subject.onNext(1);
        subject.onNext(2);
        subject.onNext(3);

        subject.subscribe(data -> System.out.println("#2 Subscriber: " + data));

        subject.onNext(4);
        subject.onComplete();
    }
}
