class NotificationService {
  constructor() {
    this.isSupported = 'Notification' in window;
    this.permission = this.isSupported ? Notification.permission : 'denied';
    this.notificationQueue = [];
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      // Request permission on initialization
      await this.requestPermission();
      
      // Create notification channel for better organization
      if (this.permission === 'granted') {
        this.createNotificationChannel();
      }
      
      this.isInitialized = true;
      console.log('NotificationService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize NotificationService:', error);
    }
  }

  async requestPermission() {
    if (!this.isSupported) {
      console.warn('Notifications not supported in this browser');
      return false;
    }

    if (this.permission === 'default') {
      try {
        this.permission = await Notification.requestPermission();
        console.log('Notification permission:', this.permission);
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        this.permission = 'denied';
      }
    }

    return this.permission === 'granted';
  }

  createNotificationChannel() {
    // For web, we can't create channels like Android, but we can organize notifications
    // This is mainly for future compatibility
    console.log('Notification channel ready');
  }

  async showNotification(title, options = {}) {
    if (!this.isSupported || this.permission !== 'granted') {
      console.log('Notifications not available or permission denied');
      return false;
    }

    const defaultOptions = {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      requireInteraction: true,
      silent: false,
      ...options
    };

    try {
      const notification = new Notification(title, defaultOptions);
      
      // Handle notification click
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        notification.close();
        
        // Navigate to the case if caseId is provided
        if (options.data?.caseId) {
          const url = `/case-timeline-activity-tracking?caseId=${options.data.caseId}`;
          window.location.href = url;
        }
      };

      // Handle notification close
      notification.onclose = () => {
        console.log('Notification closed:', title);
      };

      // Auto-close after 10 seconds if not clicked
      setTimeout(() => {
        if (notification) {
          notification.close();
        }
      }, 10000);

      return true;
    } catch (error) {
      console.error('Error showing notification:', error);
      return false;
    }
  }

  async notifyNewCase(caseData) {
    const title = `🚨 New Case Assigned: ${caseData.title}`;
    const priorityEmoji = this.getPriorityEmoji(caseData.priority);
    
    const options = {
      body: `${priorityEmoji} Priority: ${caseData.priority.toUpperCase()}\n📝 ${caseData.description}`,
      data: {
        caseId: caseData.id,
        type: 'new_case',
        priority: caseData.priority
      },
      tag: `case-${caseData.id}`, // Prevents duplicate notifications
      icon: this.getPriorityIcon(caseData.priority),
      badge: this.getPriorityIcon(caseData.priority)
    };

    return this.showNotification(title, options);
  }

  async notifyCaseUpdate(caseData, updateType) {
    const title = `📋 Case Updated: ${caseData.title}`;
    const options = {
      body: `Status: ${caseData.status.toUpperCase()}\nUpdate: ${updateType}`,
      data: {
        caseId: caseData.id,
        type: 'case_update'
      },
      tag: `update-${caseData.id}-${Date.now()}`
    };

    return this.showNotification(title, options);
  }

  async notifyHighPriorityCase(caseData) {
    const title = `🔥 URGENT: ${caseData.title}`;
    const options = {
      body: `CRITICAL PRIORITY CASE\n${caseData.description}`,
      data: {
        caseId: caseData.id,
        type: 'high_priority_case'
      },
      tag: `urgent-${caseData.id}`,
      requireInteraction: true,
      icon: '/favicon.ico',
      badge: '/favicon.ico'
    };

    return this.showNotification(title, options);
  }

  getPriorityEmoji(priority) {
    const emojis = {
      'low': '🟢',
      'medium': '🟡', 
      'high': '🔴',
      'critical': '🔥'
    };
    return emojis[priority] || '📋';
  }

  getPriorityIcon(priority) {
    // For now, using favicon for all priorities
    // You can add different icons for different priorities
    return '/favicon.ico';
  }

  // Test notification function
  async testNotification() {
    const title = '🧪 Test Notification';
    const options = {
      body: 'This is a test notification from KwikkConnect Expert System',
      data: {
        type: 'test'
      },
      tag: 'test-notification'
    };

    return this.showNotification(title, options);
  }

  // Check if notifications are supported and enabled
  isNotificationEnabled() {
    return this.isSupported && this.permission === 'granted';
  }

  // Get current permission status
  getPermissionStatus() {
    return this.permission;
  }
}

export default new NotificationService(); 