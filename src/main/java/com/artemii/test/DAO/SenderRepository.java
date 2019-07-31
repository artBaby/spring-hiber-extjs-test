package com.artemii.test.DAO;

import com.artemii.test.Entities.Sender;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SenderRepository extends CrudRepository<Sender, Long>{}
