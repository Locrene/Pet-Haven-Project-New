package com.pethaven.backend.repository;

import com.pethaven.backend.model.MessageThread;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageThreadRepository
        extends JpaRepository<MessageThread, Long> {
}