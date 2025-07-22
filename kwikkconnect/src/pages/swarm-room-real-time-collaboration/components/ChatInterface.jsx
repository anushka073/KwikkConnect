import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { geminiService } from 'utils/geminiService';

// Debug geminiService import
console.log('geminiService imported:', geminiService);
console.log('geminiService methods:', Object.getOwnPropertyNames(geminiService));
console.log('summarizeChatLog method:', geminiService.summarizeChatLog);

const SUMMARY_INTERVAL = 10; // messages
const SUMMARY_TIME_MS = 5 * 60 * 1000; // 5 minutes

const ChatInterface = ({ caseDetails }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const summaryTimerRef = useRef(null);
  const [lastSummaryIndex, setLastSummaryIndex] = useState(0);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI Assistant",
      avatar: null,
      content: `Welcome to the swarm room! I've analyzed the case details and here's a quick summary:\n\n**Issue:** ${caseDetails?.title || 'Database connection timeout'}\n**Severity:** ${caseDetails?.severity || 'High'}\n**Affected Systems:** ${caseDetails?.module || 'Production database cluster'}\n\nI'll be monitoring the conversation and providing suggestions as we progress.`,
      timestamp: new Date("2025-01-19T08:45:00"),
      type: "system",
      isAI: true
    },
    {
      id: 2,
      sender: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      content: "Hi everyone! I\'m here to help with the database issue. Let me start by checking the current connection pool status.",
      timestamp: new Date("2025-01-19T08:46:00"),
      type: "message"
    },
    {
      id: 3,
      sender: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      content: "Thanks for joining, Michael! I've uploaded the error logs and configuration files. The timeouts started around 8 AM this morning.",timestamp: new Date("2025-01-19T08:47:00"),type: "message"
    }
  ]);

  const typingUsers = ["Emma Wilson"];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Generate initial AI analysis when component mounts
    if (caseDetails && messages.length <= 3) {
      generateAIAnalysis();
    }
  }, [caseDetails]);

  // Automatically post chat summary after every SUMMARY_INTERVAL messages or every SUMMARY_TIME_MS
  useEffect(() => {
    // Clear previous timer
    if (summaryTimerRef.current) clearTimeout(summaryTimerRef.current);
    // Only consider user and AI messages (not system)
    const chatMsgs = messages.filter(m => m.type !== 'system');
    if (chatMsgs.length - lastSummaryIndex >= SUMMARY_INTERVAL) {
      autoGenerateChatSummary();
      setLastSummaryIndex(chatMsgs.length);
    } else {
      // Set timer for summary
      summaryTimerRef.current = setTimeout(() => {
        if (chatMsgs.length > lastSummaryIndex) {
          autoGenerateChatSummary();
          setLastSummaryIndex(chatMsgs.length);
        }
      }, SUMMARY_TIME_MS);
    }
    return () => {
      if (summaryTimerRef.current) clearTimeout(summaryTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateAIAnalysis = async () => {
    if (!caseDetails) return;
    
    setIsAIGenerating(true);
    try {
      const analysis = await geminiService.analyzeCase(caseDetails);
      const aiMessage = {
        id: messages.length + 1,
        sender: "AI Assistant",
        avatar: null,
        content: `🔍 **Initial Analysis Complete**\n\n**Recommended Expertise:** ${analysis.expertiseAreas?.join(', ')}\n\n**Suggested Next Steps:**\n${analysis.troubleshootingSteps?.map(step => `• ${step}`).join('\n')}\n\n**Potential Root Causes:**\n${analysis.potentialCauses?.map(cause => `• ${cause}`).join('\n')}\n\n**Urgency Level:** ${analysis.urgencyLevel}`,
        timestamp: new Date(),
        type: "suggestion",
        isAI: true,
        hasAction: true
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI analysis:', error);
    } finally {
      setIsAIGenerating(false);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // If user types /summary, trigger summary and do not send as a regular message
    if (message.trim().toLowerCase() === '/summary') {
      setMessage('');
      generateChatSummary();
      return;
    }
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
      content: message,
      timestamp: new Date(),
      type: "message"
    };
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    // Always trigger AI quick fix suggestion after every user message
    generateAISuggestion(message);
  };

  const generateAISuggestion = async (userMessage) => {
    setIsAIGenerating(true);
    try {
      const suggestion = await geminiService.suggestQuickFix(caseDetails, userMessage);
      const aiMessage = {
        id: messages.length + 2,
        sender: "AI Assistant",
        avatar: null,
        content: `💡 **AI Suggestion**\n\n${suggestion}`,
        timestamp: new Date(),
        type: "suggestion",
        isAI: true,
        hasAction: true
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsAIGenerating(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating AI suggestion:', error);
      setIsAIGenerating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
        content: `📎 Uploaded: ${file.name}`,
        timestamp: new Date(),
        type: "file",
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(1) + " KB"
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleApplyFix = async () => {
    setIsAIGenerating(true);
    try {
      const fixMessage = {
        id: messages.length + 1,
        sender: "AI Assistant",
        avatar: null,
        content: `✅ **Fix Applied Successfully**\n\nConfiguration updated based on analysis:\n• Implemented recommended changes\n• System parameters optimized\n• Monitoring enabled\n\nThe issue should be resolved. Continuing to monitor for stability.`,
        timestamp: new Date(),
        type: "system",
        isAI: true
      };
      setMessages(prev => [...prev, fixMessage]);
    } catch (error) {
      console.error('Error applying fix:', error);
    } finally {
      setIsAIGenerating(false);
    }
  };

  const generateChatSummary = async () => {
    console.log('AI Summary button clicked');
    console.log('Messages:', messages);
    console.log('Case Details:', caseDetails);
    console.log('API Key available:', !!import.meta.env.VITE_GEMINI_API_KEY);
    
    setIsAIGenerating(true);
    try {
      // Check if API key is available
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY environment variable.');
      }
      
      console.log('Calling geminiService.summarizeChatLog...');
      const summary = await geminiService.summarizeChatLog(messages, caseDetails);
      console.log('Summary generated:', summary);
      
      const summaryMessage = {
        id: messages.length + 1,
        sender: "AI Assistant",
        avatar: null,
        content: `📋 **Chat Summary for Late Joiners**\n\n${summary}`,
        timestamp: new Date(),
        type: "system",
        isAI: true
      };
      console.log('Adding summary message to chat');
      setMessages(prev => [...prev, summaryMessage]);
    } catch (error) {
      console.error('Error in generateChatSummary:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Add error message to chat
      const errorMessage = {
        id: messages.length + 1,
        sender: "AI Assistant",
        avatar: null,
        content: `❌ **Summary Generation Failed**\n\n${error.message.includes('API key') 
          ? 'Gemini API key not configured. Please set the VITE_GEMINI_API_KEY environment variable to enable AI features.'
          : 'Unable to generate chat summary at this time. Please try again later or contact support if the issue persists.'
        }\n\nError: ${error.message}`,
        timestamp: new Date(),
        type: "system",
        isAI: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAIGenerating(false);
    }
  };

  const autoGenerateChatSummary = async () => {
    setIsAIGenerating(true);
    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) return;
      const summary = await geminiService.summarizeChatLog(messages, caseDetails);
      const summaryMessage = {
        id: messages.length + 1,
        sender: "AI Assistant",
        avatar: null,
        content: `📋 **Chat Summary for Late Joiners**\n\n${summary}`,
        timestamp: new Date(),
        type: "system",
        isAI: true
      };
      setMessages(prev => [...prev, summaryMessage]);
    } catch (error) {
      // fail silently
    } finally {
      setIsAIGenerating(false);
    }
  };

  const renderMessage = (msg) => {
    const isOwnMessage = msg.sender === "You";
    const isSystemMessage = msg.type === "system" || msg.isAI;
    const isAIMessage = msg.isAI;

    return (
      <div key={msg.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
        <div className={`flex max-w-[80%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} space-x-2`}>
          {!isOwnMessage && !isSystemMessage && (
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              {msg.avatar ? (
                <img src={msg.avatar} alt={msg.sender} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-blue-200 flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
              )}
            </div>
          )}
          <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
            {!isSystemMessage && (
              <div className={`text-xs text-blue-500 mb-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                {msg.sender} • {formatTime(msg.timestamp)}
              </div>
            )}
            <div className={`rounded-lg px-4 py-3 transition-all duration-200
              ${isAIMessage ? 'bg-yellow-50 border border-yellow-300 text-yellow-900 shadow-yellow-100 shadow' :
                isSystemMessage ? 'bg-gray-100 border border-gray-200 text-gray-700' :
                isOwnMessage ? 'bg-green-100 border border-green-300 text-green-900' : 'bg-white border border-blue-100 text-blue-900'}
              ${msg.type === 'suggestion' && isAIMessage ? 'border-yellow-500' : ''}
            `}>
              {msg.type === 'code' ? (
                <div>
                  <div className="text-xs text-muted-foreground mb-2 flex items-center space-x-1">
                    <Icon name="Code" size={12} />
                    <span>{msg.language?.toUpperCase() || 'CODE'}</span>
                  </div>
                  <pre className="text-sm font-mono bg-background/50 p-2 rounded border overflow-x-auto">
                    <code>{msg.content}</code>
                  </pre>
                </div>
              ) : msg.type === 'file' ? (
                <div className="flex items-center space-x-2">
                  <Icon name="Paperclip" size={16} />
                  <div>
                    <p className="text-sm font-medium">{msg.fileName}</p>
                    <p className="text-xs text-muted-foreground">{msg.fileSize}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.hasAction && (
                    <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleApplyFix}
                        iconName="Zap"
                        iconPosition="left"
                        disabled={isAIGenerating}
                      >
                        Apply Fix
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={generateChatSummary}
                        iconName="FileText"
                        iconPosition="left"
                        disabled={isAIGenerating}
                      >
                        Summarize Chat
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 shadow-2xl rounded-2xl m-2 backdrop-blur-md">
      {/* Header */}
      <div className="p-6 border-b border-border bg-blue-100/80 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xl text-blue-900 tracking-tight">Swarm Room Chat</h3>
            <p className="text-sm text-blue-700 flex items-center mt-1">
              4 participants active
              {isAIGenerating && (
                <span className="ml-2 text-purple-600 animate-pulse">• AI analyzing...</span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* Voice/Video/Search/More buttons - all with modern shadow/hover and blue accent */}
            <button className="p-2 rounded-full shadow-md bg-white/80 text-blue-700 hover:bg-blue-200 hover:text-blue-900 hover:scale-110 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Voice Call" onClick={() => alert('Voice call feature coming soon!')}>
              <Icon name="Phone" size={18} />
            </button>
            <button className="p-2 rounded-full shadow-md bg-white/80 text-blue-700 hover:bg-blue-200 hover:text-blue-900 hover:scale-110 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Video Call" onClick={() => alert('Video call feature coming soon!')}>
              <Icon name="Video" size={18} />
            </button>
            <button className="p-2 rounded-full shadow-md bg-white/80 text-blue-700 hover:bg-blue-200 hover:text-blue-900 hover:scale-110 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Search chat">
              <Icon name="Search" size={18} />
            </button>
            <button className="p-2 rounded-full shadow-md bg-white/80 text-blue-700 hover:bg-blue-200 hover:text-blue-900 hover:scale-110 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="More options">
              <Icon name="MoreVertical" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2 bg-transparent">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`transition-all duration-300 ease-in-out ${msg.isAI ? 'animate-fade-in' : 'animate-slide-in'} ${idx === messages.length - 1 ? 'mb-2' : ''}`}
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            {renderMessage(msg)}
          </div>
        ))}
        {/* AI Generating Indicator */}
        {isAIGenerating && (
          <div className="flex items-center space-x-2 text-purple-600 mb-4 animate-pulse">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm">AI is analyzing and generating suggestions...</span>
          </div>
        )}
        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center space-x-2 text-blue-700 animate-fade-in">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm">{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* AI Summary Button */}
      <div className="px-6 py-2 flex justify-end bg-transparent">
        <Button
          size="sm"
          variant="outline"
          onClick={generateChatSummary}
          iconName="FileText"
          iconPosition="left"
          disabled={isAIGenerating}
          className="rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:scale-105 hover:shadow-lg transition-all border-0"
        >
          AI Summary
        </Button>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-border bg-blue-100/80 rounded-b-2xl">
        <div className="flex items-end space-x-3">
          <button
            onClick={handleFileUpload}
            className="p-3 rounded-full shadow-md bg-white/80 text-blue-700 hover:text-blue-900 hover:bg-blue-200 hover:scale-110 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 relative group"
            aria-label="Upload file"
            title="Attach file"
          >
            <Icon name="Paperclip" size={22} />
            <span className="absolute left-1/2 -bottom-7 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity duration-200">Attach file</span>
          </button>
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (try asking for help or suggestions)"
              className="w-full px-4 py-3 text-base bg-white/80 border border-blue-200 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none max-h-32 transition-all text-blue-900 placeholder:text-blue-400"
              rows="2"
            />
            {/* Floating send button for mobile/modern look */}
            <div className="absolute right-2 bottom-2">
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                iconName="Send"
                size="icon"
                className="rounded-full shadow-md bg-blue-500 text-white hover:scale-110 hover:bg-blue-700 hover:shadow-lg transition-transform"
                aria-label="Send message"
              />
            </div>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".txt,.log,.xml,.json,.sql,.py,.js,.jsx,.ts,.tsx"
        />
      </div>
    </div>
  );
};

export default ChatInterface;