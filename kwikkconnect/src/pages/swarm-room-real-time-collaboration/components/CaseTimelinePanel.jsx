import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const CaseTimelinePanel = ({ caseDetails }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const timelineEvents = [
    {
      id: 1,
      type: 'case_created',
      title: 'Case Created',
      description: 'Database connection timeout issue reported',
      timestamp: new Date('2025-01-19T08:30:00'),
      user: 'Sarah Chen',
      severity: 'high',
      icon: 'AlertCircle'
    },
    {
      id: 2,
      type: 'expert_assigned',
      title: 'Expert Assigned',
      description: 'Michael Rodriguez assigned as database expert',
      timestamp: new Date('2025-01-19T08:45:00'),
      user: 'System',
      severity: 'medium',
      icon: 'UserCheck'
    },
    {
      id: 3,
      type: 'analysis_started',
      title: 'Analysis Started',
      description: 'Initial investigation of connection pool status',
      timestamp: new Date('2025-01-19T09:00:00'),
      user: 'Michael Rodriguez',
      severity: 'medium',
      icon: 'Search'
    },
    {
      id: 4,
      type: 'fix_applied',
      title: 'Quick Fix Applied',
      description: 'Increased max_connections from 15 to 25',
      timestamp: new Date('2025-01-19T09:15:00'),
      user: 'Michael Rodriguez',
      severity: 'low',
      icon: 'Zap'
    },
    {
      id: 5,
      type: 'monitoring_added',
      title: 'Monitoring Enabled',
      description: 'Real-time connection monitoring implemented',
      timestamp: new Date('2025-01-19T09:30:00'),
      user: 'Sarah Chen',
      severity: 'low',
      icon: 'Activity'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Events', icon: 'List' },
    { key: 'case_created', label: 'Case Events', icon: 'AlertCircle' },
    { key: 'expert_assigned', label: 'Expert Events', icon: 'UserCheck' },
    { key: 'analysis_started', label: 'Analysis', icon: 'Search' },
    { key: 'fix_applied', label: 'Fixes', icon: 'Zap' },
    { key: 'monitoring_added', label: 'Monitoring', icon: 'Activity' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-destructive';
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/10';
      case 'high':
        return 'bg-error/10';
      case 'medium':
        return 'bg-warning/10';
      case 'low':
        return 'bg-success/10';
      default:
        return 'bg-muted';
    }
  };

  const filteredEvents = timelineEvents.filter(event => 
    activeFilter === 'all' || event.type === activeFilter
  );

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background/80 to-muted/40 shadow-2xl rounded-2xl m-2">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card/80 rounded-t-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-foreground tracking-tight">Timeline</h3>
          <span className="text-sm text-muted-foreground">{filteredEvents.length} events</span>
        </div>
        {/* Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`flex items-center space-x-1 px-4 py-2 text-xs font-semibold rounded-full transition-colors duration-200 whitespace-nowrap shadow-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                activeFilter === filter.key
                  ? 'bg-primary text-primary-foreground border-primary scale-105'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-primary/10'
              }`}
            >
              <Icon name={filter.icon} size={14} />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Events */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="relative pl-8 space-y-8">
          {/* Vertical timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 to-accent/10 rounded-full pointer-events-none" />
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="flex space-x-5 items-start animate-fade-in"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* Timeline Dot */}
              <div className="relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-4 border-white ${getSeverityBg(event.severity)} animate-bounce-in`}>
                  <Icon name={event.icon} size={18} className={getSeverityColor(event.severity)} />
                </div>
                {index < filteredEvents.length - 1 && (
                  <div className="absolute left-1/2 top-full w-0.5 h-8 bg-border -translate-x-1/2"></div>
                )}
              </div>
              {/* Event Content */}
              <div className="flex-1 min-w-0 bg-white/80 shadow-xl rounded-xl p-5 border border-border hover:shadow-2xl transition-all duration-200">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-base font-semibold text-foreground">{event.title}</h4>
                  <span className="text-xs text-muted-foreground font-mono">{formatTime(event.timestamp)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">by {event.user}</span>
                  <span className={`text-xs px-3 py-1 rounded-full ${getSeverityBg(event.severity)} ${getSeverityColor(event.severity)} font-semibold capitalize`}>
                    {event.severity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseTimelinePanel;