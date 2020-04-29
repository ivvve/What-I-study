package _05_Function

fun actionWithString(input: String, action: (String) -> String): String {
    return action(input)
}