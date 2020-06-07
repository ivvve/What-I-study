package io.github.ivvve.api.user;

import io.github.ivvve.user.entity.User;
import io.github.ivvve.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RequiredArgsConstructor
@RestController
@RequestMapping("users")
public class UserController {
    private final UserService userService;

    @GetMapping
    public Flux<User> getAllUsers() {
        return this.userService.getAll();
    }

    @PostMapping
    public Flux<User> addNewUser(@RequestBody final AddNewUserRequest request) {
        return this.userService.addUser(request.name, request.nickname)
                .flatMapMany(u -> this.userService.getAll());
    }
}
