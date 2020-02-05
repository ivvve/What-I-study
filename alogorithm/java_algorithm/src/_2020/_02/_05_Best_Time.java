package _2020._02;

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

/**
 * Runtime: 309 ms, faster than 5.03% of Java online submissions for Best Time to Buy and Sell Stock.
 * Memory Usage: 42.1 MB, less than 5.31% of Java online submissions for Best Time to Buy and Sell Stock.
 */
public class _05_Best_Time {
    public static void main(String[] args) {
        System.out.println(new _05_Best_Time().maxProfit(new int[]{7,1,5,3,6,4}));
    }

    public int maxProfit(int[] prices) {
        int maxProfie = 0;

        final int loop = prices.length;
        for (int i = 0; i < loop; i++) {
            final int buy = prices[i];

            for (int j = i; j < loop; j++) {
                final int sell = prices[j];

                final int profit = sell - buy;

                if (maxProfie < profit) {
                    maxProfie = profit;
                }
            }
        }

        return maxProfie;
    }
}
