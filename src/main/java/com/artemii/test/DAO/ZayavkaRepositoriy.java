package com.artemii.test.DAO;


import com.artemii.test.Entities.Zayavka;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZayavkaRepositoriy extends CrudRepository<Zayavka, Long>{}

