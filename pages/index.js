import { useState, useRef, useEffect } from "react";
import Head from "next/head";

const STARTER_PROMPTS = [
  "Explain quantum computing simply",
  "Write a Python function to sort a list",
  "What are REST API best practices?",
  "Give me a startup idea for 2025",
];

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    setInput("");

    const userMsg = { role: "user", content: msg };
    const updated = [...messages, userMsg];

    setMessages(updated);
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: msg,
        history: updated,
      }),
    });

    const data = await res.json();

    setMessages([
      ...updated,
      { role: "assistant", content: data.reply },
    ]);

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <Head>
        <title>NovaChat</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="bg">
        <div className="container">

          {/* HEADER */}
          <div className="header">
            <div className="logo">◈ NovaChat</div>
            <div className="tag">AI Assistant</div>
          </div>

          {/* CHAT */}
          <div className="chat">

            {messages.length === 0 && (
              <div className="empty">
                <h1>What can I help with?</h1>
                <p>Ask anything — Nova is ready.</p>

                <div className="chips">
                  {STARTER_PROMPTS.map((p) => (
                    <button key={p} onClick={() => sendMessage(p)}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`msg ${m.role === "user" ? "user" : "bot"}`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="msg bot">Thinking...</div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="inputBox">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Message Nova..."
            />
            <button onClick={() => sendMessage()}>
              Send
            </button>
          </div>

        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          font-family: Inter, sans-serif;
        }

        /* BACKGROUND */
        .bg {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at top, #1a1a2e, #0f0f1a);
          color: white;
        }

        /* CONTAINER */
        .container {
          width: 100%;
          max-width: 800px;
          height: 90vh;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(20px);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }

        /* HEADER */
        .header {
          padding: 16px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .logo {
          font-weight: 600;
        }

        .tag {
          font-size: 12px;
          opacity: 0.6;
        }

        /* CHAT */
        .chat {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        .empty {
          text-align: center;
          margin-top: 80px;
        }

        .empty h1 {
          font-size: 22px;
          margin-bottom: 10px;
        }

        .empty p {
          opacity: 0.6;
          margin-bottom: 20px;
        }

        .chips button {
          margin: 5px;
          padding: 8px 12px;
          border-radius: 10px;
          border: none;
          background: rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
        }

        /* MESSAGES */
        .msg {
          margin: 8px 0;
          padding: 12px 14px;
          border-radius: 14px;
          max-width: 75%;
          animation: fadeIn 0.2s ease;
        }

        .user {
          background: linear-gradient(135deg, #6a5af9, #8b5cf6);
          margin-left: auto;
        }

        .bot {
          background: rgba(255,255,255,0.08);
        }

        /* INPUT */
        .inputBox {
          display: flex;
          padding: 12px;
          border-top: 1px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.2);
        }

        input {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 10px;
          outline: none;
          background: rgba(255,255,255,0.1);
          color: white;
        }

        button {
          margin-left: 10px;
          padding: 12px 16px;
          border: none;
          border-radius: 10px;
          background: #6a5af9;
          color: white;
          cursor: pointer;
        }

        /* ANIMATION */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}