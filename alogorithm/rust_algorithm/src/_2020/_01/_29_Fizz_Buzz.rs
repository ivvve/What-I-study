// https://leetcode.com/problems/fizz-buzz/
impl Solution {
    pub fn fizz_buzz(n: i32) -> Vec<String> {
        let mut vec: Vec<String> = Vec::new();

        for i in 1..(n + 1) {
            vec.push(get_result(i));
        }

        return vec;
    }
}

fn get_result(number: i32) -> String {
    if number % 15 == 0 {
        return String::from("FizzBuzz");
    }

    if number % 3 == 0 {
        return String::from("Fizz");
    }

    if number % 5 == 0 {
        return String::from("Buzz");
    }

    return number.to_string();
}
