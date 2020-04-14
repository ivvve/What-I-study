package _2020._04;

import java.util.*;

/**
 * 정수 배열이 주어졌을 때, 자기보다 오른쪽에 있는 모든 정수 중에서 더 낮은 값을 가지는 정수의 개수를 모두 리턴하라.
 *
 * - Example:
 * Input: [6, 8, 10, 2, 1, 1, 4]
 * Output: [4, 4, 4, 2, 0, 0, 0]
 *
 * - Explanation:
 * 6보다 오른쪽에 있는 정수 중 더 낮은 값의 개수는 4 이다. (2, 1, 1, 4)
 * 8보다 오른쪽에 있는 정수 중 더 낮은 값의 개수는 4 이다. (2, 1, 1, 4)
 * 10보다 오른쪽에 있는 정수 중 더 낮은 값의 개수는 4 이다. (2, 1, 1, 4)
 * 2보다 오른쪽에 있는 정수 중 더 낮은 값의 개수는 2 이다. (1, 1)
 * 1보다 오른쪽에 있는 정수 중 더 낮은 값의 개수는 0 이다.
 * 1보다 오른쪽에 있는 정수 중 더 낮은 값의 개수는 0 이다.
 * 4보다 오른쪽에 있는 정수 중 더 낮은 값의 개수는 0 이다.
 *
 * - Challenge:
 * Time complexity: O(nlogn)
 */
public class _2nd_week_Array {
    public static void main(String[] args) {
       final int[] input = {6, 8, 10, 2, 1, 1, 4};
       final int[] output = {4, 4, 4, 2, 0, 0, 0};

        System.out.println(Arrays.toString(solution(input)));
    }

    public static int[] solution(final int[] numbers) {
        final int inputSize = numbers.length;
        final int[] result = new int[inputSize];

        for (int i = 0; i < inputSize; i++) {
            final int number = numbers[i];

            for (int j = i; j < inputSize; j++) {
                final int comparedNumber = numbers[j];

                if (comparedNumber < number) {
                    result[i]++;
                }
            }
        }

        return result;
    }
}
