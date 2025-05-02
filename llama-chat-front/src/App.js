import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import logo from './logo.jpeg'
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { id: uuidv4(), sender: 'bot', text: 'Hi, ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: uuidv4(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5283/api/chat', {
        message: input
      });
    
      const botText = response.data.response || 'No response received.';
      const botMessage = {
        id: uuidv4(),
        sender: 'bot',
        text: botText
      };
    
      setMessages(prev => [...prev, botMessage]);
    
    } catch (error) {
      const errorMessage = {
        id: uuidv4(),
        sender: 'bot',
        text: '⚠️ Failed to connect to backend.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      <a href="https://duckheadsdev.com" target="_blank" rel="noopener noreferrer">
        <img src={logo} className="App-logo" alt="DuckHeads Development" />
      </a>
        <h1>Mehmet Sezen Llama Chatbot</h1>
      </header>

      <div className="Chat-Container">
      <div className="Chat-Messages">
      {messages.map(msg => (
       <div key={msg.id} className={`Chat-Message ${msg.sender}`}>
         {msg.text}
        </div>
      ))}

        {loading && <div className="Chat-Message bot">Thinking...</div>}
      </div>

        <form className="Chat-Input" onSubmit={handleSend}>
          <textarea
            placeholder="Type your message..."
            rows="1"
            className="chat-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>  {
              if(e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            } }
          ></textarea>
          <button type="submit" disabled={loading}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
