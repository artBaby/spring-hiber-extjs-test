package com.artemii.test.DAO;

import com.artemii.test.Entities.Receiver;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceiverRepository extends CrudRepository<Receiver, Long> {}
