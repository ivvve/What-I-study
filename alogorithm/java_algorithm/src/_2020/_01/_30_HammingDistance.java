package _2020._01;

// https://leetcode.com/problems/hamming-distance/
public class _30_HammingDistance {
    public static void main(String[] args) {
        System.out.println(new _30_HammingDistance().hammingDistance(1, 4));
    }

    public int hammingDistance(final int x, final int y) {
        final int xor = x ^ y;
        return Integer.bitCount(xor);
    }
}
