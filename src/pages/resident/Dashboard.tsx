import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, LogOut, Users, Wrench, Calendar, ShoppingBag, MessageSquare, Bell } from 'lucide-react';

const ResidentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('visitors');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 'visitors', label: 'Visitors', icon: Users, path: '/resident/visitors' },
    { id: 'services', label: 'Services', icon: Wrench, path: '/resident/services' },
    { id: 'facilities', label: 'Facilities', icon: Calendar, path: '/resident/facilities' },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, path: '/resident/marketplace' },
    { id: 'feed', label: 'Community', icon: MessageSquare, path: '/resident/feed' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-elevated">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Community Manager</h1>
                <p className="text-sm text-primary-foreground/80">Welcome, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-white/20"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-primary-foreground hover:bg-white/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Card */}
        <Card className="mb-6 shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle>Dashboard Overview</CardTitle>
            <CardDescription>
              Flat {user?.flatNumber} • Quick access to community features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gradient-card hover:shadow-card transition-all duration-200 hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-elevated">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-center">{item.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 animate-slide-up">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground mt-1">Visitor requests waiting</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-secondary">2</p>
              <p className="text-sm text-muted-foreground mt-1">Facility reservations</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Unread Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">5</p>
              <p className="text-sm text-muted-foreground mt-1">Community updates</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ResidentDashboard;
