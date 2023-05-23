import React from 'react'
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const Messenger = () => {
  const handleNewUserMessage = (message) => {
    console.log('New message:', message);
   
  };
  return (
    <>
     
      <Widget
        title="Chatbot"
        subtitle="Ask me anything"
        handleNewUserMessage={handleNewUserMessage}
      />
    </>
  );
}

export default Messenger