import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import notificationService from 'utils/notificationService';
import apiService from 'utils/apiService';

const ExpertDashboard = () => {
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState('Checking...');

  useEffect(() => {
    initializeExpert();
    initializeNotifications();
  }, []);

  const initializeExpert = async () => {
    // For demo, use a default expert
    const defaultExpert = {
      email: 'expert@example.com',
      name: 'John Expert'
    };
    setExpert(defaultExpert);
    
    try {
      // Register expert with backend
      await apiService.registerExpert(defaultExpert.email, defaultExpert.name);
      loadExpertCases(defaultExpert.email);
    } catch (error) {
      console.error('Failed to register expert:', error);
      loadExpertCases(defaultExpert.email);
    }
  };

  const initializeNotifications = async () => {
    try {
      await notificationService.initialize();
      const isEnabled = notificationService.isNotificationEnabled();
      const status = notificationService.getPermissionStatus();
      
      setNotificationPermission(isEnabled);
      setNotificationStatus(status);
      
      console.log('Notification status:', status, 'Enabled:', isEnabled);
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
      setNotificationStatus('Error');
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const granted = await notificationService.requestPermission();
      setNotificationPermission(granted);
      setNotificationStatus(notificationService.getPermissionStatus());
      
      if (granted) {
        // Show a test notification
        await notificationService.testNotification();
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const testNotification = async () => {
    try {
      await notificationService.testNotification();
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  };

  const createDemoCase = async () => {
    try {
      const demoCase = {
        title: 'Demo Case - ' + new Date().toLocaleTimeString(),
        description: 'This is a demo case created to test notifications',
        priority: 'high',
        assignedTo: 'expert@example.com'
      };

      const response = await apiService.createCase(demoCase);
      
      if (response.success) {
        // Send notification
        await notificationService.notifyNewCase(response.case);
        
        // Refresh cases
        loadExpertCases(expert.email);
      }
    } catch (error) {
      console.error('Error creating demo case:', error);
    }
  };

  const loadExpertCases = async (email) => {
    try {
      const response = await apiService.getExpertCases(email);
      setCases(response.cases);
    } catch (error) {
      console.error('Failed to load cases:', error);
      // Load demo cases if API fails
      setCases([
        {
          id: 'CASE-0001',
          title: 'Database Connection Timeout',
          description: 'Users experiencing connection issues',
          priority: 'high',
          status: 'new',
          createdAt: new Date().toISOString()
        },
        {
          id: 'CASE-0002',
          title: 'Payment Gateway Error',
          description: 'Payment processing failing for some users',
          priority: 'critical',
          status: 'in-progress',
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateCaseStatus = async (caseId, newStatus) => {
    try {
      await apiService.updateCaseStatus(caseId, newStatus);
      setCases(cases.map(c => 
        c.id === caseId ? { ...c, status: newStatus } : c
      ));
      
      // Show notification for status update
      const updatedCase = cases.find(c => c.id === caseId);
      if (updatedCase) {
        notificationService.notifyCaseUpdate(updatedCase, `Status changed to ${newStatus}`);
      }
    } catch (error) {
      console.error('Failed to update case status:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors['new'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'text-green-600',
      'medium': 'text-yellow-600',
      'high': 'text-red-600',
      'critical': 'text-red-800'
    };
    return colors[priority] || colors['medium'];
  };

  const getPriorityEmoji = (priority) => {
    const emojis = {
      'low': '🟢',
      'medium': '🟡',
      'high': '🔴',
      'critical': '🔥'
    };
    return emojis[priority] || '📋';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={32} className="animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your cases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Expert Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {expert?.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name={notificationPermission ? "Bell" : "BellOff"} size={20} />
              <span className="text-sm text-muted-foreground">
                {notificationStatus === 'granted' ? 'Notifications enabled' : 'Notifications disabled'}
              </span>
            </div>
            {!notificationPermission && (
              <Button
                variant="outline"
                size="sm"
                onClick={requestNotificationPermission}
              >
                Enable Notifications
              </Button>
            )}
            {notificationPermission && (
              <Button
                variant="outline"
                size="sm"
                onClick={testNotification}
              >
                Test Notification
              </Button>
            )}
            {notificationPermission && (
              <Button
                variant="outline"
                size="sm"
                onClick={createDemoCase}
              >
                Create Demo Case
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              Back to Main App
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid gap-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={20} className="text-blue-600" />
                <span className="text-sm font-medium text-muted-foreground">Total Cases</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-2">{cases.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-yellow-600" />
                <span className="text-sm font-medium text-muted-foreground">In Progress</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-2">
                {cases.filter(c => c.status === 'in-progress').length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-green-600" />
                <span className="text-sm font-medium text-muted-foreground">Resolved</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-2">
                {cases.filter(c => c.status === 'resolved').length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={20} className="text-red-600" />
                <span className="text-sm font-medium text-muted-foreground">High Priority</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-2">
                {cases.filter(c => c.priority === 'high' || c.priority === 'critical').length}
              </p>
            </div>
          </div>

          {/* Cases List */}
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Your Assigned Cases</h2>
            </div>
            <div className="p-6">
              {cases.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No cases assigned yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cases.map((caseItem) => (
                    <div key={caseItem.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-lg">{getPriorityEmoji(caseItem.priority)}</span>
                            <h3 className="font-semibold text-foreground">{caseItem.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                              {caseItem.status.replace('-', ' ')}
                            </span>
                            <span className={`text-sm font-medium ${getPriorityColor(caseItem.priority)}`}>
                              {caseItem.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{caseItem.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>ID: {caseItem.id}</span>
                            <span>Created: {new Date(caseItem.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <select
                            value={caseItem.status}
                            onChange={(e) => updateCaseStatus(caseItem.id, e.target.value)}
                            className="text-sm border border-border rounded px-2 py-1 bg-background"
                          >
                            <option value="new">New</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                          </select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/case-timeline-activity-tracking?caseId=${caseItem.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExpertDashboard; 