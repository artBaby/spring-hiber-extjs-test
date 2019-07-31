package com.artemii.test.Service;

import com.artemii.test.DAO.ReceiverRepository;
import com.artemii.test.Entities.Receiver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReceiverService {

  @Autowired
  ReceiverRepository receiverRepository;

  public List<Receiver> getAllReceivers() {
    List<Receiver> senders = new ArrayList<>();
    receiverRepository.findAll().forEach(senders::add);
    return senders;
  }
}
