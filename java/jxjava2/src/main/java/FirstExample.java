import io.reactivex.Observable;

public class FirstExample {
    public static void main(String[] args) {
        Observable.just("Hello", "JxJava 2!!") // data source
//                .subscribe(it -> System.out.println(it));
                .subscribe(System.out::println);
    }
}
