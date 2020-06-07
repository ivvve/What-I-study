package io.github.ivvve.user.service;

import io.github.ivvve.user.entity.User;
import io.github.ivvve.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public Flux<User> getAll() {
        return this.userRepository.findAll();
    }

    public Mono<User> addUser(final String name, final String nickname) {
        return this.userRepository.save(new User(name, nickname));
    }
}
