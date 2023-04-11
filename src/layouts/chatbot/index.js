import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import Chatbot component and necessary classes
import { createChatBotMessage } from "react-chatbot-kit";
import config from "./chatbot/config";
import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";
import Chatbot from "react-chatbot-kit";

// Create an instance of ActionProvider and MessageParser
const actionProvider = new ActionProvider();
const messageParser = new MessageParser();

// Define initial messages for Chatbot
const initialMessages = [
  createChatBotMessage("Hello! I'm a chatbot. How can I assist you?")
];

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Chatbot 
      config={config}
      actionProvider={actionProvider}
      messageParser={messageParser}
      initialMessages={initialMessages}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();