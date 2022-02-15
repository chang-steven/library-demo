package com.example.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.UUID;

public class Person {
    private final UUID id;
    private final String name;
    private final String email;
    private final String phone;

    public Person(@JsonProperty("id") UUID id,
                  @JsonProperty("name") String name,
                  @JsonProperty("email") String email,
                  @JsonProperty("phone") String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }
}

