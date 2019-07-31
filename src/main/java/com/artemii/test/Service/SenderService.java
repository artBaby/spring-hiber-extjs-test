package com.artemii.test.Service;

import com.artemii.test.DAO.SenderRepository;
import com.artemii.test.Entities.Sender;
import com.artemii.test.Entities.Zayavka;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SenderService {

  @Autowired
  SenderRepository senderRepository;

  public Optional<Sender> getSender(Long id) {
    return senderRepository.findById(id);
  }

  public List<Sender> getAllSenders() {
    List<Sender> senders = new ArrayList<>();
    senderRepository.findAll().forEach(senders::add);
    return senders;
  }

}
