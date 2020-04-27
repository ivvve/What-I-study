package _03_Types;

import java.util.Random;

public class TypeCastingBasic {
    public static void main(String[] args) {
        Object result;

        if (new Random().nextBoolean()) {
            result = "Hello";
        } else {
            result = 12345;
        }

        System.out.println("Result is " + result);

        if (result instanceof String) {
            System.out.println(((String) result).substring(0, 1));
        } else {
            System.out.println(((Integer) result) + 3);
        }
    }
}
