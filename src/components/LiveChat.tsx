'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, BadgeCheck } from 'lucide-react';
import { properties } from '@/data/properties';
import { useApp } from '@/context/AppContext';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

const mockReplies: Record<string, string> = {
  waterfront: "We have several extraordinary waterfront estates. Our crown jewel is the *Oceanfront Sanctuary* in Golden Beach ($24,500,000) and the *Aqua Marina Villa* in Key Biscayne ($16,800,000). Both feature deep-water docks, infinity edge pools, and floor-to-ceiling glass façades. Would you like to review their specifications?",
  process: "For international clients, EstateNova coordinates full transactional services. We handle escrow creation, localized tax structuring, and absolute legal due diligence. Most acquisitions can be structured remotely within 14 business days. Would you like to connect with our legal counsel?",
  tour: "Private showings can be scheduled at your convenience. We offer helicopter tours, yacht approaches, and private chauffeured transport. Please specify which properties you wish to see and your arrival dates in our Contact form at the bottom, or call +1 (305) 555-0190.",
  mortgage: "Certainly. For our luxury portfolio, typical structures involve 30% down payments with competitive private banking interest rates hovering around 4.5% to 5.2%. Our details page contains an active calculator for precise monthly breakdowns. Shall we configure one for you?"
};

const getInitialMessages = (): Message[] => [
  {
    id: 'init',
    sender: 'agent',
    text: "Welcome to EstateNova Private Concierge. I am Elena, your dedicated assistant. How may I elevate your property search today?",
    timestamp: new Date()
  }
];

const createMessage = (sender: 'user' | 'agent', text: string): Message => ({
  id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
  sender,
  text,
  timestamp: new Date(),
});

export default function LiveChat() {
  const { formatPrice } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(getInitialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Initial trigger to nudge user after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setUnreadCount(1);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const triggerAgentReply = (userText: string) => {
    setIsTyping(true);
    
    // Determine context
    const textLower = userText.toLowerCase();
    let replyText = "I have received your inquiry. A private wealth advisor from our team will contact you shortly to provide bespoke support. In the meantime, you can explore our properties grid or submit a scheduling request below.";
    
    if (textLower.includes('waterfront') || textLower.includes('beach') || textLower.includes('ocean') || textLower.includes('villa')) {
      replyText = mockReplies.waterfront;
    } else if (textLower.includes('process') || textLower.includes('international') || textLower.includes('buy') || textLower.includes('purchase')) {
      replyText = mockReplies.process;
    } else if (textLower.includes('tour') || textLower.includes('visit') || textLower.includes('view') || textLower.includes('schedule')) {
      replyText = mockReplies.tour;
    } else if (textLower.includes('page') || textLower.includes('calculator') || textLower.includes('mortgage') || textLower.includes('loan') || textLower.includes('rate')) {
      replyText = mockReplies.mortgage;
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        createMessage('agent', replyText)
      ]);
    }, 1500);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = createMessage('user', text);
    
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    triggerAgentReply(text);
  };

  const chips = [
    { label: '🏖️ Waterfront Estates', text: 'Tell me about your best waterfront villas.' },
    { label: '✈️ International Buyers', text: 'What is the purchasing process for international buyers?' },
    { label: '🚁 Book Private Tour', text: 'How do I book a private property showing?' },
    { label: '📈 Mortgage Structure', text: 'Can you explain the luxury mortgage rates?' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      
      {/* Floating Chat Button */}
      <motion.button
        onClick={handleOpenToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 bg-gold-gradient text-slate-950 rounded-full flex items-center justify-center shadow-2xl cursor-pointer bg-gold-glow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-slate-950 animate-bounce">
            {unreadCount}
          </span>
        )}
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-16 right-0 w-[360px] md:w-[400px] h-[550px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-left"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" 
                      alt="Concierge Assistant" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-950 rounded-full" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-serif flex items-center gap-1">
                    Elena Valenzuela
                    <BadgeCheck className="w-3.5 h-3.5 fill-gold-500 text-slate-950" />
                  </h4>
                  <p className="text-[10px] text-slate-450 uppercase tracking-widest font-semibold flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-gold-500" />
                    Private Concierge
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[80%] flex flex-col space-y-1">
                    <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gold-500 text-slate-950 rounded-tr-none font-medium'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none font-normal'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 text-right px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 border border-slate-800 text-slate-300 rounded-2xl rounded-tl-none p-3.5 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-slate-550 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-slate-550 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-slate-550 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Pre-populated Prompt Chips */}
            <div className="px-4 py-2 border-t border-slate-900 bg-slate-950 overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar">
              {chips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip.text)}
                  className="inline-block px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white rounded-full text-[10px] font-medium transition-all cursor-pointer whitespace-nowrap"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Form Input Footer */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-slate-900 bg-slate-900 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Elena a question..."
                className="flex-1 bg-slate-950 border border-slate-850 px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
              <button
                type="submit"
                className="p-2.5 bg-gold-gradient text-slate-950 rounded-xl hover:shadow-md transition-all active:scale-95 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
