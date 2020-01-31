package _2020._01;

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
public class _31_Best {

    public static void main(String[] args) {
        System.out.println(new _31_Best().maxProfit(new int[] {7, 6, 4, 3, 1}));
    }

    public int maxProfit(final int[] prices) {
        int totalProfit = 0;

        final int loop = prices.length - 1;

        for (int i = 0; i < loop; i++) {
            final int todayPrice = prices[i];
            final int tomorrowPrice = prices[i + 1];

            if (todayPrice < tomorrowPrice) {
                totalProfit += tomorrowPrice - todayPrice;
            }
        }

        return totalProfit;
    }
}
