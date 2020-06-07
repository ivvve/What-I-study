package io.github.ivvve.user.entity;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter // getter가 없으면 response에서 field를 가져올 수 없다.
@Document
public class User {
    @Id
    private String id;
    private String name;
    private String nickname;

    public User(final String name, final String nickname) {
        this.name = name;
        this.nickname = nickname;
    }
}
