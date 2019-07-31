package com.artemii.test.Service;

import com.artemii.test.DAO.StatusRepository;
import com.artemii.test.Entities.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatusService {

  @Autowired
  StatusRepository statusRepository;

  public List<Status> getAllStatuses(){
    List<Status> statuses = new ArrayList<>();
    statusRepository.findAll().forEach(statuses::add);
    return statuses;
  }

}
