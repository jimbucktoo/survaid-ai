import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [displayedText, setDisplayedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const chatHistoryRef = useRef(null);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleChat();
    }
  };

  const handleChat = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/chat", {
        user_input: userInput,
        pdf_paths: ["./PHQ9.pdf", "./SBQ-R.pdf"],
      });

      const currentTime = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      const newEntry = {
        user: userInput,
        model: response.data.response,
        timestamp: currentTime,
      };

      setChatHistory([...chatHistory, newEntry]);
      setUserInput("");
      setDisplayedText("");
      setTypingIndex(0);
    } catch (error) {
      console.error("Error in chat:", error);
    }
  };

  useEffect(() => {
    if (chatHistory.length > 0) {
      const latestMessage = chatHistory[chatHistory.length - 1].model;
      const typeText = () => {
        if (typingIndex < latestMessage.length) {
          setDisplayedText((prev) => prev + latestMessage[typingIndex]);
          setTypingIndex((prev) => prev + 1);
        }
      };
      const typingInterval = setInterval(typeText, 15);

      return () => clearInterval(typingInterval);
    }
  }, [chatHistory, typingIndex]);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [displayedText]);

  return (
    <div className="chatContainer">
      <h3 className="header">
        Chat with <span className="surv">Surv</span>
        <span className="aid">aid</span>
      </h3>
      <div className="chatHistory" ref={chatHistoryRef}>
        {chatHistory.map((entry, index) => (
          <div key={index} className="chatEntry">
            <div className="userMessage">
              <p className="userMessageText">{entry.user}</p>
              <p className="userTimestamp">{entry.timestamp}</p>{" "}
            </div>
            <div className="aiMessage">
              <p className="aiMessageText">
                {index === chatHistory.length - 1 ? displayedText : entry.model}
              </p>
              <p className="aiTimestamp">{entry.timestamp}</p>{" "}
            </div>
          </div>
        ))}
      </div>
      <div className="inputs">
        <input
          placeholder="Message Survaid"
          className="textInput form-control"
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary send" onClick={handleChat}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
