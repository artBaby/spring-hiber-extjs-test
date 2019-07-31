package com.artemii.test.Service;

import com.artemii.test.DAO.SenderRepository;
import com.artemii.test.DAO.ZayavkaRepositoriy;
import com.artemii.test.Entities.Zayavka;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ZayavkaService {

    @Autowired
    ZayavkaRepositoriy zayavkaRepositoriy;

    @Autowired
    SenderRepository senderRepository;

    public List<Zayavka> getAllZayavki() {
        List<Zayavka> zayavkas = new ArrayList<Zayavka>();
        zayavkaRepositoriy.findAll().forEach(zayavka -> zayavkas.add(zayavka));
        return zayavkas;
    }

    public boolean saveZayavka(Zayavka zayavka) {
        zayavkaRepositoriy.save(zayavka);
        return true;
    }

    public boolean deleteZayavka(Zayavka zayavka) {
        zayavkaRepositoriy.delete(zayavka);
        return true;
    }

}
