package com.artemii.test.Entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Status {

  @Id
  @Column(name = "status_id", nullable = false)
  private Long status_id;

  @Column(name = "name")
  private String name;

  public Long getId() {
    return status_id;
  }

  public void setId(Long id) {
    this.status_id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
