package com.pethaven.backend.service;

import com.pethaven.backend.model.Message;
import com.pethaven.backend.model.MessageThread;
import com.pethaven.backend.repository.MessageThreadRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageThreadRepository repository;

    public List<MessageThread> getAllThreads() {
        return repository.findAll();
    }

    public MessageThread createThread(MessageThread thread) {
        return repository.save(thread);
    }

    public MessageThread addReply(Long threadId, Message message) {

        MessageThread thread =
                repository.findById(threadId).orElse(null);

        if (thread == null) {
            return null;
        }

        thread.getMessages().add(message);

        thread.setPreview(message.getText());
        thread.setLastSeen("Just now");

        return repository.save(thread);
    }
}