import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "../assets/survaid.png";

const ChatComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
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
      setChatHistory([
        ...chatHistory,
        { user: userInput, model: response.data.response },
      ]);
      setUserInput("");
    } catch (error) {
      console.error("Error in chat:", error);
    }
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

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
            </div>
            <div className="aiMessage">
              <p className="aiMessageText">{entry.model}</p>
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
