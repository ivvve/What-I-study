package _2020._02;

// https://leetcode.com/problems/reverse-integer/
public class _01_Reverse_Integer {
    public static void main(String[] args) {
        System.out.println(Integer.MAX_VALUE * 10);
        System.out.println(new _01_Reverse_Integer().reverse(-1200));
    }

    public int reverse(int x) {
        int reversedNumber = 0;

        while (x != 0) {
            final int lastDigit = x % 10;
            reversedNumber *= 10;

            // overflow
            if (reversedNumber < 0) {
                return 0;
            }

            reversedNumber += lastDigit;

            x /= 10;
        }

        return reversedNumber;
    }
}
