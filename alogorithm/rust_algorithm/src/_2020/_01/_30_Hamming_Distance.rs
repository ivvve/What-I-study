use std::ops::BitXor;

// https://leetcode.com/problems/hamming-distance/
impl Solution {
    pub fn hamming_distance(x: i32, y: i32) -> i32 {
        let xor = x.bitxor(y) as u32;
        return xor.count_ones() as i32;
    }
}
