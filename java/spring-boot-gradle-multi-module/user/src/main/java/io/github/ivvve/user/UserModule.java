package io.github.ivvve.user;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@ComponentScan(basePackages = "io.github.ivvve.user")
@EnableReactiveMongoRepositories
public class UserModule {
}
