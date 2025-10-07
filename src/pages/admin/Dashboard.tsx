import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Shield, Building2, LogOut, MessageSquare, Calendar, AlertTriangle, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { label: 'Total Residents', value: '450', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Visitors', value: '23', icon: Shield, color: 'bg-green-500' },
    { label: 'Facilities', value: '8', icon: Building2, color: 'bg-purple-500' },
    { label: 'Pending Complaints', value: '7', icon: AlertTriangle, color: 'bg-red-500' },
    { label: 'Upcoming Events', value: '3', icon: Calendar, color: 'bg-orange-500' },
    { label: 'Community Posts', value: '45', icon: MessageSquare, color: 'bg-cyan-500' },
  ];

  const recentActivity = [
    { title: 'New resident registered', detail: 'Flat A-501', time: '10 mins ago' },
    { title: 'Facility booking approved', detail: 'Gym - Morning slot', time: '30 mins ago' },
    { title: 'Complaint resolved', detail: 'Elevator maintenance', time: '1 hour ago' },
    { title: 'Event posted', detail: 'Holi Celebration', time: '2 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-primary text-primary-foreground shadow-elevated">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-sm text-primary-foreground/80">Welcome, {user?.name}</p>
              </div>
            </div>
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
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shrink-0`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-3">
              <Button className="h-auto py-4 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Manage Residents</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col gap-2" variant="secondary">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Manage Facilities</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col gap-2" variant="secondary">
                <MessageSquare className="h-6 w-6" />
                <span className="text-sm">Post Announcement</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col gap-2" variant="secondary">
                <AlertTriangle className="h-6 w-6" />
                <span className="text-sm">View Complaints</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
