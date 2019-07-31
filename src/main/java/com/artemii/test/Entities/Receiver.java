package com.artemii.test.Entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Receiver {

  @Id
  @Column(name = "receiver_id", nullable = false)
  private Long receiver_id;

  @Column(name = "name")
  private String name;

  public Long getId() {
    return receiver_id;
  }

  public void setId(Long id) {
    this.receiver_id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
