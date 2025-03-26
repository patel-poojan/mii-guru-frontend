import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaRegUser } from 'react-icons/fa';
import { RiGraduationCapLine } from "react-icons/ri";
import { LuSend } from "react-icons/lu";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import axios from 'axios';
interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}
interface DisplayMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}
const ChatCoPilot = ({ base_url, topicID, AUTH_TOKEN, isChatFullScreen, setIsChatFullScreen }:{
  base_url: string,
  topicID: string,
  AUTH_TOKEN: string,
  isChatFullScreen: boolean,
  setIsChatFullScreen: (value: boolean) => void
}) => {
  // const [thread_id] = useState("d2d0f473-9599-40eb-92a2-a3cd32e42634");
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  // const [inputMessage, ] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    fetchChatHistory();
  }, [topicID]);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`${base_url}/chat/history/${topicID}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
      });
      if (response.data.success) {
        const historyMessages = response.data.data.messages.map((msg: ChatMessage, index: number) => ({
          id: index + 1,
          text: msg.content,
          sender: msg.role === "user" ? "user" : "ai"
        }));
        setMessages(historyMessages);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleSendMessage = async () => {
    const messageText = inputRef.current?.value.trim()??"";
    if (messageText === '') return;
  
    // Add user message immediately
    const userMessage:DisplayMessage  = { id: messages.length + 1, text: messageText, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    if(inputRef.current) inputRef.current.value = ""
    setLoading(true);
  
    try {
      const response = await axios.post(
        `${base_url}/chatbot`,
        { topic_id: topicID, question: messageText },
        { headers: { Authorization: `Bearer ${AUTH_TOKEN}`, 'Content-Type': 'application/json' } }
      );
      
      setLoading(false);
      
      if (response.data.success) {
        const words = response.data.response.split(' ');
        let currentText = '';
        
        const animateTyping = (index: number) => {
          if (index < words.length) {
            currentText += (index === 0 ? '' : ' ') + words[index]; // Append words gradually
            setMessages((prevMessages) => {
              const lastMessageIndex = prevMessages.length;
              const newMessages = [...prevMessages];
              
              if (newMessages[lastMessageIndex - 1]?.sender === 'ai') {
                newMessages[lastMessageIndex - 1].text = currentText;
              } else {
                newMessages.push({ id: lastMessageIndex + 1, text: currentText, sender: 'ai' });
              }
              
              return newMessages;
            });
  
            setTimeout(() => animateTyping(index + 1), 100);
          }
        };
  
        animateTyping(0);
      } else {
        console.error('Error fetching AI response:', response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch response:', error);
      setLoading(false);
    }
  };
  // const handleStopGenerating = () => {
  //   setStopGenerating(true);
  //   clearTimeout(typingTimer);
  // };
  const handleClearChat = () => {
    setMessages([]);
  };

  const toggleFullScreen = () => {
    setIsChatFullScreen(!isChatFullScreen);
  };

  // const scrollToBottom = () => {
  //   messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm h-full flex flex-col ${isChatFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="bg-gray-200 p-4 rounded-t-xl flex items-center justify-between border-b-2 border-gray-200">
        <div className="flex items-center space-x-3">
          <RiGraduationCapLine className="w-6 h-6 text-[var(--MainLight-color)]" />
          <h3 className="font-semibold text-gray-800">Mii Guru CoPilot</h3>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={handleClearChat} className="text-black hover:text-red-500 underline underline-offset-4 opacity-60 hover:opacity-80">Clear chat</button>
          <button onClick={toggleFullScreen} className="text-black hover:scale-110">
            {isChatFullScreen ? <MdFullscreenExit className="w-10 h-10 opacity-60" /> : <MdFullscreen className="w-10 h-10 opacity-60" />}
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start space-x-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'ai' && <RiGraduationCapLine className='h-8 w-8 text-[var(--MainLight-color)] mt-2'/>}
            <div className={`rounded-lg max-w-[70%] ${message.sender === 'user' ? 'px-5 py-3 bg-[var(--Secondary-color)] text-black' : 'p-5 py-4 bg-gray-200 text-gray-800'}`}>
              {message.sender === 'ai' ? <ReactMarkdown>{message.text}</ReactMarkdown> : <p>{message.text}</p>}
            </div>
            {message.sender === 'user' && <FaRegUser className='h-6 w-6 text-black/70 mt-2'/>}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <RiGraduationCapLine className='h-6 w-6 text-gray-400' />
            <p>Generating...</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center space-x-3">
        <input 
          type="text"
          placeholder="Type your question here..."
          // value={inputMessage}
          ref={inputRef}
          onKeyPress={handleKeyPress}
          // onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg"
        />
        <button onClick={handleSendMessage} className="bg-[var(--MainLight-color)] text-black/60 p-3 rounded-full hover:bg-[var(--MainLight-color)]">
          {loading ? <CgSandClock  className="animate-spin transition-all duration-1000"/>: <LuSend className='h-6 w-auto'/>}
        </button>
      </div>
    </div>
  );
};

export default ChatCoPilot;