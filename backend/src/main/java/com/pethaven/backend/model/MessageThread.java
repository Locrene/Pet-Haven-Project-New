package com.pethaven.backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class MessageThread {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String subject;
    private String preview;
    private String lastSeen;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Message> messages = new ArrayList<>();

    public MessageThread() {}

    public MessageThread(String name, String subject, String preview, String lastSeen) {
        this.name = name;
        this.subject = subject;
        this.preview = preview;
        this.lastSeen = lastSeen;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSubject() {
        return subject;
    }

    public String getPreview() {
        return preview;
    }

    public String getLastSeen() {
        return lastSeen;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setPreview(String preview) {
        this.preview = preview;
    }

    public void setLastSeen(String lastSeen) {
        this.lastSeen = lastSeen;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
}