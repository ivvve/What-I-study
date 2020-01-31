// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/submissions/
impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        if prices.len() == 0 {
            return 0;
        }

        let mut totalProfit = 0;

        let looop = prices.len() - 1;
        for i in 0..looop {
            let todayPrice = unsafe { prices.get_unchecked(i) };
            let tomorrowPrice = unsafe { prices.get_unchecked(i + 1) };

            if todayPrice < tomorrowPrice {
                totalProfit += (tomorrowPrice - todayPrice);
            }
        }

        return totalProfit;
    }
}
