import "./chatbot.css";
import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config";
import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";

export default function AppChatbot() {
  return (
    <div className="AppChatbot">
      <div style={{ maxWidth: "500px" }}>
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </div>
    </div>
  );
}
