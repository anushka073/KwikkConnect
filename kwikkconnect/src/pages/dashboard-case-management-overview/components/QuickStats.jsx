import React from 'react';
import Icon from 'components/AppIcon';

const QuickStats = ({ cases }) => {
  const stats = [
    {
      label: 'Total Cases',
      value: cases.length,
      icon: 'FileText',
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      label: 'Open Cases',
      value: cases.filter(c => c.status === 'open').length,
      icon: 'AlertCircle',
      color: 'text-warning',
      bg: 'bg-warning/10'
    },
    {
      label: 'In Progress',
      value: cases.filter(c => c.status === 'in-progress').length,
      icon: 'Clock',
      color: 'text-accent',
      bg: 'bg-accent/10'
    },
    {
      label: 'Expert Assigned',
      value: cases.filter(c => c.status === 'expert-assigned').length,
      icon: 'Users',
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      label: 'Critical Issues',
      value: cases.filter(c => c.severity === 'critical').length,
      icon: 'AlertTriangle',
      color: 'text-destructive',
      bg: 'bg-destructive/10'
    },
    {
      label: 'Resolved Today',
      value: cases.filter(c => {
        const today = new Date().toDateString();
        return c.status === 'resolved' && new Date(c.updatedAt).toDateString() === today;
      }).length,
      icon: 'CheckCircle',
      color: 'text-success',
      bg: 'bg-success/10'
    }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 lg:px-6 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-background rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon name={stat.icon} size={20} className={stat.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground truncate">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStats;