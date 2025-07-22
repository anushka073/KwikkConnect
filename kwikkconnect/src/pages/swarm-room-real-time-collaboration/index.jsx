import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import NavigationHeader from 'components/ui/NavigationHeader';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import FloatingAIAssistant from 'components/ui/FloatingAIAssistant';
import CaseContextSidebar from 'components/ui/CaseContextSidebar';
import ParticipantsPanel from './components/ParticipantsPanel';
import ChatInterface from './components/ChatInterface';
import CaseTimelinePanel from './components/CaseTimelinePanel';
import Icon from '../../components/AppIcon';


const SwarmRoomRealTimeCollaboration = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [caseDetails, setCaseDetails] = useState(null);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState('timeline');

  useEffect(() => {
    // Get case details from location state or search params
    if (location.state?.caseDetails) {
      setCaseDetails(location.state.caseDetails);
    } else {
      // Mock case details - in real app, fetch from API using caseId
      const caseId = searchParams.get('caseId') || 'CASE-2024-001';
      setCaseDetails({
        id: caseId,
        title: 'Database Connection Timeout',
        description: 'Users experiencing intermittent database connection timeouts during peak hours affecting order processing system.',
        module: 'Database',
        severity: 'high',
        status: 'expert-assigned',
        expertAccepted: true,
        createdAt: '2024-07-19T08:30:00Z',
        updatedAt: '2024-07-19T09:15:00Z'
      });
    }
  }, [location.state, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/60 to-accent/10">
      <NavigationHeader />
      <BreadcrumbNavigation />
      <main className="flex h-screen pt-16 gap-4 px-4">
        {/* Left Sidebar - Participants */}
        <div className="w-80 max-w-xs flex-shrink-0">
          <ParticipantsPanel caseDetails={caseDetails} />
        </div>
        {/* Center - Chat Interface */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatInterface caseDetails={caseDetails} />
        </div>
        {/* Right Sidebar - Case Details & Timeline */}
        <div className={`relative transition-all duration-500 ${isRightPanelCollapsed ? 'w-14' : 'w-[22rem]'} flex-shrink-0`}>
          <button
            onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground shadow-lg hover:scale-110 transition-all duration-200 z-20"
            aria-label={isRightPanelCollapsed ? 'Expand right panel' : 'Collapse right panel'}
          >
            <Icon name={isRightPanelCollapsed ? 'ChevronLeft' : 'ChevronRight'} size={16} />
          </button>
          {!isRightPanelCollapsed && (
            <div className="flex flex-col h-full">
              {/* Tab Navigation */}
              <div className="flex border-b border-border bg-card/80 rounded-t-2xl overflow-hidden">
                <button
                  onClick={() => setActiveRightTab('timeline')}
                  className={`flex-1 px-6 py-4 text-base font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 ${activeRightTab === 'timeline' ? 'text-primary border-b-4 border-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setActiveRightTab('context')}
                  className={`flex-1 px-6 py-4 text-base font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 ${activeRightTab === 'context' ? 'text-primary border-b-4 border-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Case Context
                </button>
              </div>
              {/* Tab Content */}
              <div className="flex-1 overflow-hidden rounded-b-2xl bg-transparent">
                {activeRightTab === 'timeline' && (
                  <CaseTimelinePanel caseDetails={caseDetails} />
                )}
                {activeRightTab === 'context' && (
                  <CaseContextSidebar caseDetails={caseDetails} />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <FloatingAIAssistant />
    </div>
  );
};

export default SwarmRoomRealTimeCollaboration;