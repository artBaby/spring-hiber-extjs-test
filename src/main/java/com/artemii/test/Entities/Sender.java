package com.artemii.test.Entities;

import javax.persistence.*;

@Entity
@Table
public class Sender {

    @Id
    @Column(name = "sender_id", nullable = false)
    private Long sender_id;

    @Column(name = "name")
    private String name;

    public Long getId() {
        return sender_id;
    }

    public void setId(Long id) {
        this.sender_id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
