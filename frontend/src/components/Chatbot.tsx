import { useState } from "react";
import { chat } from "../api/backend";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  async function send() {
    setMessages([...messages, { sender: "user", text: input }]);
    const res = await chat(input);
    setMessages((m) => [...m, { sender: "assistant", text: res.reply }]);
    setInput("");
  }

  return (
    <div className="card">
      <h2>Chatbot</h2>

      <div className="chat-window">
        {messages.map((m, idx) => (
          <p key={idx}><strong>{m.sender}:</strong> {m.text}</p>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%" }}
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
