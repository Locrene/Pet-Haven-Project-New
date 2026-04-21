import { useState } from "react";

function Messages() {
  const messageThreads = [
    {
      id: 1,
      name: "Anna Santos",
      subject: "Question about Luna",
      preview: "Hi, is Luna still available for adoption?",
      lastSeen: "2h ago",
      messages: [
        { from: "Anna", text: "Hi, is Luna still available for adoption?", type: "incoming" },
        { from: "You", text: "Yes, Luna is ready to meet a new family.", type: "outgoing" },
      ],
    },
    {
      id: 2,
      name: "Marco dela Cruz",
      subject: "Missing dog report",
      preview: "I found a dog near Labangon...",
      lastSeen: "5h ago",
      messages: [
        { from: "Marco", text: "I found a dog near Labangon. Can this be posted?", type: "incoming" },
        { from: "You", text: "Yes, please share the details and photo.", type: "outgoing" },
      ],
    },
    {
      id: 3,
      name: "Grace Ramos",
      subject: "Adoption follow-up",
      preview: "Would you like to meet tonight?",
      lastSeen: "1d ago",
      messages: [
        { from: "Grace", text: "Would you like to meet tonight?", type: "incoming" },
        { from: "You", text: "Sure, let’s schedule for 7 PM.", type: "outgoing" },
      ],
    },
  ];

  const [activeThread, setActiveThread] = useState(messageThreads[0]);

  return (
    <div className="messages-page">
      <div className="messages-header">
        <div>
          <h2>Messages</h2>
          <p className="page-subtitle">Keep adoption conversations organized and replies quick.</p>
        </div>
        <button className="btn btn-primary">New Message</button>
      </div>

      <div className="messages-wrapper">
        <aside className="message-list">
          {messageThreads.map((thread) => (
            <div
              key={thread.id}
              className={`message-item ${activeThread.id === thread.id ? "active" : ""}`}
              onClick={() => setActiveThread(thread)}
            >
              <h4>{thread.name}</h4>
              <p>{thread.preview}</p>
              <small>{thread.lastSeen}</small>
            </div>
          ))}
        </aside>

        <div className="message-preview">
          <div>
            <h3>{activeThread.subject}</h3>
            <div className="thread-bubble incoming">
              {activeThread.messages[0].text}
            </div>
            <div className="thread-bubble outgoing">
              {activeThread.messages[1].text}
            </div>
          </div>

          <div className="message-input">
            <textarea placeholder="Write a reply..." />
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
