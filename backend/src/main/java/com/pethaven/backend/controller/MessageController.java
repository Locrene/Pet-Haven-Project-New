package com.pethaven.backend.controller;

import com.pethaven.backend.model.Message;
import com.pethaven.backend.model.MessageThread;
import com.pethaven.backend.service.MessageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    @Autowired
    private MessageService service;

    @GetMapping
    public List<MessageThread> getAllThreads() {
        return service.getAllThreads();
    }

    @PostMapping
    public MessageThread createThread(
            @RequestBody MessageThread thread
    ) {
        return service.createThread(thread);
    }

    @PostMapping("/{id}/reply")
    public MessageThread addReply(
            @PathVariable Long id,
            @RequestBody Message message
    ) {
        return service.addReply(id, message);
    }
}