package io.github.ivvve.jdbcaccountexample.account;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@DisplayName("AccountRepository")
@DataJdbcTest
class AccountRepositoryTest {
    @Autowired
    private AccountRepository accountRepository;

    @DisplayName("save method")
    @Nested
    class saveMethod {
        final Account accountData = new Account("devson", LocalDate.of(1991, 11, 9), City.SEOUL);

        @DisplayName("should return Account instance with id")
        @Test
        void shouldReturnAccountInstanceWithId() {
            // when
            final Account account = accountRepository.save(accountData);

            // then
            assertThat(account.getId()).isNotNull();
        }

        @DisplayName("should save Account data")
        @Test
        void shouldSaveAccountData() {
            // when
            final Account account = accountRepository.save(accountData);

            // then
            final Account savedAccount = accountRepository.findById(account.getId())
                    .orElseThrow(() -> {
                        throw new RuntimeException("Test failed: Account is not saved");
                    });

            assertThat(savedAccount.getName()).isEqualTo(accountData.getName());
            assertThat(savedAccount.getBirthday()).isEqualTo(accountData.getBirthday());
            assertThat(savedAccount.getCity()).isEqualTo(accountData.getCity());
        }
    }

    @DisplayName("findAllByName method")
    @Nested
    class findAllByNameMethod {

        @DisplayName("should return all accounts with the name")
        @Test
        void shouldReturnAllAccountsWithTheName() {
            // given
            final String nameA = "alice";
            final String nameB = "bob";

            accountRepository.saveAll(Arrays.asList(
                    new Account(nameA, LocalDate.of(2000, 1, 1), City.SEOUL),
                    new Account(nameB, LocalDate.of(2000, 1, 1), City.JEJU)
            ));

            // when
            final List<Account> accounts = accountRepository.findAllByName(nameB);

            // then
            assertThat(accounts).hasSize(1);
            assertThat(accounts.get(0).getName()).isEqualTo(nameB);
        }
    }
}
