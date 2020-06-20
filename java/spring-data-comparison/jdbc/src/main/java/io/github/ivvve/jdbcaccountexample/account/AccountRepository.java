package io.github.ivvve.jdbcaccountexample.account;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AccountRepository extends CrudRepository<Account, Long> {
    List<Account> findAllByName(final String name);
}
