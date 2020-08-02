package io.github.ivvve.jdbcaccountexample.account;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
@EqualsAndHashCode(of = "id")
public class Account {
    @Id
    private Long id;
    private String name;
    private LocalDate birthday;
    private City city;

    public Account(final String name, final LocalDate birthday, final City city) {
        this.name = name;
        this.birthday = birthday;
        this.city = city;
    }

    public void greet() {
        System.out.println("Hi, my name is " + this.name +
                " and I was born on " + this.birthday.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) +
                " and I'm living in " + this.city);
    }
}
