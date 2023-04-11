import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./chatbot.css";
const Chatbot = () => {
  return (
    <div className="khungchat">
		<div class="header">Chatbot</div>
  		<div class="message-container">
		  
  		</div>
  		<div class="input-container">
    		<input type="text" class="input-message" placeholder="Nhập tin nhắn"/>
    		<buton class="send-button">Gửi</buton>
  		</div>
      </div>
  );
};

export default Chatbot;
