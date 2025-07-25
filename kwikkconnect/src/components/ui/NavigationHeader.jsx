import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const NavigationHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-case-management-overview',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Expert Matching',
      path: '/expert-matching-panel',
      icon: 'Users'
    },
    {
      label: 'Swarm Room',
      path: '/swarm-room-real-time-collaboration',
      icon: 'MessageSquare'
    },
    {
      label: 'Timeline',
      path: '/case-timeline-activity-tracking',
      icon: 'Clock'
    },
    {
      label: 'Postmortem',
      path: '/postmortem-analysis-documentation',
      icon: 'FileText'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleCreateCase = () => {
    navigate('/create-new-case-form');
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/dashboard-case-management-overview')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" className="animate-3d-spin" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              KwikkConnect
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium shadow transition-all duration-200
                ${isActivePath(item.path)
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-white/80 text-blue-700 hover:text-blue-900 hover:bg-blue-100 hover:shadow-lg hover:scale-105'}
              `}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={handleCreateCase}
          >
            Create Case
          </Button>
          <button className="relative p-2 text-muted-foreground bg-white/80 rounded-full shadow transition-all duration-200 hover:bg-blue-100 hover:text-blue-900 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <Icon name="Bell" size={20} />
            <span className="absolute top-1 left-5 w-2 h-2 bg-red-500 rounded-full shadow-md border-2 border-white"></span>
          </button>
          <button className="p-2 text-muted-foreground bg-white/80 rounded-full shadow transition-all duration-200 hover:bg-blue-100 hover:text-blue-900 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <Icon name="Settings" size={20} />
          </button>
          <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl">
            <Icon name="User" size={20} color="white" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-fade-in">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
            <div className="pt-2 border-t border-border mt-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={handleCreateCase}
                fullWidth
              >
                Create Case
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;