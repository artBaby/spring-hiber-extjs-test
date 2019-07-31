package com.artemii.test.Controllers;

import com.artemii.test.Entities.Receiver;
import com.artemii.test.Entities.Sender;
import com.artemii.test.Entities.Status;
import com.artemii.test.Service.ReceiverService;
import com.artemii.test.Service.SenderService;
import com.artemii.test.Service.StatusService;
import com.artemii.test.Service.ZayavkaService;
import com.artemii.test.Entities.Zayavka;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class StartPageController {

    @Autowired
    ZayavkaService zayavkaService;

    @Autowired
    SenderService senderService;

    @Autowired
    ReceiverService receiverService;

    @Autowired
    StatusService statusService;

    @GetMapping({"/"})
    public String getHomePage() {
        return "index";
    }

    @ResponseBody
    @GetMapping({"/getAll"})
    public Map<String, List<Zayavka>> getAllZayavki() {
        Map<String, List<Zayavka>> all = new HashMap<>();
        all.put("zayavkas", zayavkaService.getAllZayavki());
        return all;
    }

    @ResponseBody
    @GetMapping({"/getSenders"})
    public Map<String, List<Sender>> getSenders() {
        Map<String, List<Sender>> senders = new HashMap<>();
        senders.put("senders", senderService.getAllSenders());
        return senders;
    }

    @ResponseBody
    @GetMapping({"/getReceivers"})
    public Map<String, List<Receiver>> getReceivers() {
        Map<String, List<Receiver>> receivers = new HashMap<>();
        receivers.put("receivers", receiverService.getAllReceivers());
        return receivers;
    }

    @ResponseBody
    @GetMapping({"/getStatuses"})
    public Map<String, List<Status>> getStatuses() {
        Map<String, List<Status>> statuses = new HashMap<>();
        statuses.put("statuses", statusService.getAllStatuses());
        return statuses;
    }

    @RequestMapping(value = "save", method = RequestMethod.POST)
    @ResponseBody
    public boolean saveZayavka(@RequestBody Zayavka zayavka) {
        return zayavkaService.saveZayavka(zayavka);
    }

    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseBody
    public boolean deleteZayavka(@RequestBody Zayavka zayavka) {
        return zayavkaService.deleteZayavka(zayavka);
    }

}
