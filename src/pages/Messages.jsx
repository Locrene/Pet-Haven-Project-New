import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";

function Messages() {
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [message, setMessage] = useState("");

  const currentUser = AuthService.getCurrentUser();
  const isAdmin = currentUser?.role === "ADMIN";

  const senderName = `${currentUser?.firstName || ""} ${
    currentUser?.lastName || ""
  }`.trim();

  const loadMessages = () => {
    fetch("http://localhost:8080/api/messages")
      .then((res) => res.json())
      .then((data) => {
        const filteredMessages = isAdmin
          ? data
          : data.filter((thread) => thread.name === senderName);

        setThreads(filteredMessages);

        if (filteredMessages.length > 0) {
          setActiveThread(filteredMessages[0]);
        } else {
          setActiveThread(null);
        }
      });
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert("Please write a message first.");
      return;
    }

    let response;

    if (isAdmin && activeThread) {
      response = await fetch(
        `http://localhost:8080/api/messages/${activeThread.id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: "Admin",
            text: message,
            type: "outgoing",
          }),
        }
      );
    } else {
      response = await fetch("http://localhost:8080/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: senderName,
          subject: `Message from ${senderName}`,
          preview: message,
          lastSeen: "Just now",
          messages: [
            {
              sender: senderName,
              text: message,
              type: "incoming",
            },
          ],
        }),
      });
    }

    const savedThread = await response.json();

    setMessage("");
    setActiveThread(savedThread);
    loadMessages();

    alert(isAdmin ? "Reply sent!" : "Message sent to admin!");
  };

  if (!currentUser) {
    return (
      <div className="messages-page">
        <h2>Messages</h2>
        <p>Please log in first to use messages.</p>
      </div>
    );
  }

  return (
    <div className="messages-page">
      <div className="messages-header">
        <div>
          <h2>{isAdmin ? "Admin Messages" : "Message Admin"}</h2>
          <p className="page-subtitle">
            {isAdmin
              ? "View messages from users and reply to them."
              : `Logged in as ${senderName}. Send a message directly to admin.`}
          </p>
        </div>
      </div>

      <div className="messages-wrapper">
        <aside className="message-list">
          {threads.length === 0 ? (
            <p style={{ padding: "15px" }}>No messages yet.</p>
          ) : (
            threads.map((thread) => (
              <div
                key={thread.id}
                className={`message-item ${
                  activeThread?.id === thread.id ? "active" : ""
                }`}
                onClick={() => setActiveThread(thread)}
              >
                <h4>{isAdmin ? thread.name : "Admin"}</h4>
                <p>{thread.preview}</p>
                <small>{thread.lastSeen}</small>
              </div>
            ))
          )}
        </aside>

        <div className="message-preview">
          {activeThread ? (
            <div>
              <h3>{activeThread.subject}</h3>

              {activeThread.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`thread-bubble ${
                    msg.sender === senderName ? "outgoing" : "incoming"
                  }`}
                >
                  <strong>{msg.sender === "Admin" ? "Admin" : activeThread.name}:{" "} </strong>
                  {msg.text}
                </div>
              ))}
            </div>
          ) : (
            !isAdmin && <h3>Start a message with Admin</h3>
          )}

          <div className="message-input">
            <textarea
              placeholder={
                isAdmin
                  ? "Write a reply to the user..."
                  : "Write your message to admin..."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="btn btn-primary" onClick={handleSendMessage}>
              {isAdmin ? "Send Reply" : "Send to Admin"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;