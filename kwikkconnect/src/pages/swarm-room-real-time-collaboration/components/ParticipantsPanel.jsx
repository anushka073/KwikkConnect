import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ParticipantsPanel = ({ caseDetails }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const participants = [
    {
      id: 1,
      name: "Michael Rodriguez",
      role: "Database Engineer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      status: "online",
      isTyping: false,
      lastSeen: null
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "System Administrator",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      status: "online",
      isTyping: true,
      lastSeen: null
    },
    {
      id: 3,
      name: "David Kim",
      role: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      status: "online",
      isTyping: false,
      lastSeen: null
    },
    {
      id: 4,
      name: "Emma Wilson",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      status: "away",
      isTyping: false,
      lastSeen: "2 min ago"
    },
    {
      id: 5,
      name: "Alex Thompson",
      role: "Security Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
      status: "offline",
      isTyping: false,
      lastSeen: "1 hour ago"
    },
    {
      id: 6,
      name: "AI Assistant",
      role: "AI Bot",
      avatar: null,
      status: "online",
      isTyping: false,
      lastSeen: null,
      isAI: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'away':
        return 'bg-warning';
      case 'offline':
        return 'bg-muted';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/40 shadow-xl rounded-2xl m-2">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card/80 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground tracking-tight">Participants</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {participants.filter(p => p.status === 'online').length} online
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full shadow-md bg-white/80 hover:bg-primary/10 hover:scale-110 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={isExpanded ? 'Collapse participants' : 'Expand participants'}
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={18} />
          </button>
        </div>
      </div>

      {/* Participants List */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className={`flex items-center space-x-4 p-3 rounded-2xl shadow transition-all duration-200 group cursor-pointer ${participant.isAI ? 'bg-muted/60 border border-dashed border-accent' : 'bg-white/60'} hover:bg-primary/5 hover:shadow-lg hover:scale-[1.02]`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-background group-hover:border-primary transition-all duration-200">
                  {participant.isAI ? (
                    <div className="w-full h-full bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center">
                      <Icon name="Bot" size={28} color="#6366f1" />
                    </div>
                  ) : participant.avatar ? (
                    <img src={participant.avatar} alt={participant.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <Icon name="User" size={24} color="white" />
                    </div>
                  )}
                </div>
                {!participant.isAI && (
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow ${getStatusColor(participant.status)}`}></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-base font-medium text-foreground truncate">{participant.name}</p>
                  {participant.isAI && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-accent/20 text-accent font-semibold">AI</span>
                  )}
                  {participant.isTyping && !participant.isAI && (
                    <span className="text-xs text-accent flex items-center ml-1">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full animate-bounce mr-0.5" style={{animationDelay: '0s'}}></span>
                      <span className="inline-block w-2 h-2 bg-accent rounded-full animate-bounce mr-0.5" style={{animationDelay: '0.15s'}}></span>
                      <span className="inline-block w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></span>
                      <span className="ml-1">typing...</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{participant.role}</p>
                {participant.lastSeen && !participant.isAI && (
                  <p className="text-xs text-muted-foreground mt-0.5">{participant.lastSeen}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="p-6 border-t border-border bg-card/80 rounded-b-2xl">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-medium text-primary bg-muted/60 border border-border rounded-2xl shadow-md hover:bg-primary/10 hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30">
          <Icon name="UserPlus" size={20} />
          <span>Invite Expert</span>
        </button>
      </div>
    </div>
  );
};

export default ParticipantsPanel;