package io.github.ivvve.jdbcaccountexample.account;

public enum City {
    SEOUL,
    INCHOEN,
    CHUNCHUNG,
    JEJU;

    @Override
    public String toString() {
        return super.toString().toLowerCase();
    }
}
