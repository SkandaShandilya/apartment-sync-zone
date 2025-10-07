import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, LogOut, Search, Check, X, Package } from 'lucide-react';
import { toast } from 'sonner';

interface VisitorEntry {
  id: string;
  name: string;
  flatNumber: string;
  purpose: string;
  time: string;
  status: 'pending' | 'approved' | 'denied';
}

const GuardDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [visitors, setVisitors] = useState<VisitorEntry[]>([
    { id: '1', name: 'John Doe', flatNumber: 'A-101', purpose: 'Family Visit', time: '10:30 AM', status: 'pending' },
    { id: '2', name: 'Amazon Delivery', flatNumber: 'B-205', purpose: 'Package', time: '11:15 AM', status: 'pending' },
    { id: '3', name: 'Sarah Smith', flatNumber: 'C-304', purpose: 'Guest', time: '12:00 PM', status: 'pending' },
  ]);

  const [parcels] = useState([
    { id: '1', flatNumber: 'A-101', courier: 'Amazon', time: 'Today 10:30 AM' },
    { id: '2', flatNumber: 'B-205', courier: 'Flipkart', time: 'Today 11:45 AM' },
  ]);

  const handleApprove = (id: string) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' as const } : v));
    toast.success('Visitor entry approved');
  };

  const handleDeny = (id: string) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: 'denied' as const } : v));
    toast.error('Visitor entry denied');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredVisitors = visitors.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.flatNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-primary text-primary-foreground shadow-elevated">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Guard Panel</h1>
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
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or flat number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Visitor Entries */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Pending Visitor Entries</h2>
          <div className="space-y-3">
            {filteredVisitors.map((visitor) => (
              <Card key={visitor.id} className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{visitor.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Flat {visitor.flatNumber} • {visitor.purpose}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{visitor.time}</p>
                    </div>
                    <Badge
                      variant={
                        visitor.status === 'approved' ? 'default' :
                        visitor.status === 'denied' ? 'destructive' :
                        'secondary'
                      }
                    >
                      {visitor.status}
                    </Badge>
                  </div>
                </CardHeader>
                {visitor.status === 'pending' && (
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(visitor.id)}
                        className="flex-1 bg-success hover:bg-success/90"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve Entry
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeny(visitor.id)}
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Deny Entry
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Parcel Log */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Parcel Deliveries</h2>
          <div className="space-y-3">
            {parcels.map((parcel) => (
              <Card key={parcel.id} className="shadow-card">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Flat {parcel.flatNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {parcel.courier} • {parcel.time}
                      </p>
                    </div>
                    <Badge>Received</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuardDashboard;
