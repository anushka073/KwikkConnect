import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import NoteModal from './NoteModal';

const CaseContextSidebar = ({ caseId = "CASE-2024-001", caseTitle = "Database Connection Timeout", caseStatus = "in-progress" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [notes, setNotes] = useState([]); // For demo, local state
  const [shareMessage, setShareMessage] = useState('');
  const [showManualCopy, setShowManualCopy] = useState(false);
  const [manualCopyUrl, setManualCopyUrl] = useState('');

  const caseNavigationItems = [
    {
      label: 'Expert Matching',
      path: '/expert-matching-panel',
      icon: 'Users',
      description: 'Find and assign experts'
    },
    {
      label: 'Swarm Room',
      path: '/swarm-room-real-time-collaboration',
      icon: 'MessageSquare',
      description: 'Real-time collaboration',
      badge: '3 active'
    },
    {
      label: 'Timeline',
      path: '/case-timeline-activity-tracking',
      icon: 'Clock',
      description: 'Activity tracking'
    },
    {
      label: 'Postmortem',
      path: '/postmortem-analysis-documentation',
      icon: 'FileText',
      description: 'Analysis & documentation'
    }
  ];

  const statusConfig = {
    'in-progress': { color: 'text-primary', bg: 'bg-primary/10', label: 'In Progress' },
    'urgent': { color: 'text-warning', bg: 'bg-warning/10', label: 'Urgent' },
    'critical': { color: 'text-error', bg: 'bg-error/10', label: 'Critical' },
    'resolved': { color: 'text-success', bg: 'bg-success/10', label: 'Resolved' }
  };

  const currentStatus = statusConfig[caseStatus] || statusConfig['in-progress'];

  // Only show sidebar on case-specific pages
  const caseSpecificPaths = [
    '/expert-matching-panel',
    '/swarm-room-real-time-collaboration',
    '/case-timeline-activity-tracking',
    '/postmortem-analysis-documentation'
  ];

  if (!caseSpecificPaths.includes(location.pathname)) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    if (shareMessage) {
      const timer = setTimeout(() => setShareMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [shareMessage]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block fixed left-0 top-16 bottom-0 z-900 bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground">CASE ID</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${currentStatus.bg} ${currentStatus.color}`}>
                      {currentStatus.label}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground truncate">{caseId}</h3>
                  <p className="text-sm text-muted-foreground truncate mt-1">{caseTitle}</p>
                </div>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {caseNavigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors duration-200 group ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className={isActivePath(item.path) ? 'text-primary-foreground' : 'group-hover:text-primary transition-colors duration-200'}
                />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isActivePath(item.path) 
                            ? 'bg-primary-foreground/20 text-primary-foreground' 
                            : 'bg-accent text-accent-foreground'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-1 ${
                      isActivePath(item.path) ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200" onClick={() => setNoteModalOpen(true)}>
                  <Icon name="Plus" size={16} />
                  <span>Add Note</span>
                </button>
                {/* Notes List */}
                {notes.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Saved Notes</div>
                    {notes.map(note => (
                      <div key={note.id} className="p-2 bg-muted rounded border border-border">
                        <div className="text-xs text-muted-foreground mb-1">{note.author} • {new Date(note.timestamp).toLocaleString()}</div>
                        <div className="text-sm text-foreground">{note.content}</div>
                      </div>
                    ))}
                  </div>
                )}
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200" onClick={async () => {
                  const caseUrl = window.location.origin + `/case-timeline-activity-tracking`;
                  const shareData = {
                    title: caseTitle,
                    text: `Check out this case: ${caseTitle}`,
                    url: caseUrl,
                  };
                  if (navigator.share) {
                    try {
                      await navigator.share(shareData);
                      setShareMessage('Shared successfully!');
                    } catch (e) {
                      setShareMessage('Share cancelled.');
                    }
                  } else {
                    try {
                      await navigator.clipboard.writeText(caseUrl);
                      setShareMessage('Link copied!');
                    } catch (e) {
                      setManualCopyUrl(caseUrl);
                      setShowManualCopy(true);
                      setShareMessage('Failed to copy link. Please copy manually.');
                    }
                  }
                }}>
                  <Icon name="Share" size={16} />
                  <span>Share Case</span>
                </button>
                {shareMessage && (
                  <div className="text-xs text-success mt-2">{shareMessage}</div>
                )}
                {showManualCopy && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                      <h2 className="text-lg font-semibold mb-4">Copy Link Manually</h2>
                      <input
                        className="w-full mb-3 px-3 py-2 border rounded text-sm"
                        value={manualCopyUrl}
                        readOnly
                        onFocus={e => e.target.select()}
                      />
                      <div className="flex justify-end">
                        <button
                          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => setShowManualCopy(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Sheet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-1100 bg-card border-t border-border">
        <div className="flex items-center justify-around p-2">
          {caseNavigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActivePath(item.path)
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge && (
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      <NoteModal
        open={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        onSave={note => setNotes([...notes, note])}
      />
    </>
  );
};

export default CaseContextSidebar;