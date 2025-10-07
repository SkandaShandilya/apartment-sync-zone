import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users, Clock, Package, UserCheck, Truck, QrCode, Check, X, Search } from 'lucide-react';
import { toast } from 'sonner';

interface Visitor {
  id: string;
  name: string;
  type: 'family' | 'guest' | 'maid' | 'delivery' | 'service';
  purpose: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
}

const Visitors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [visitors, setVisitors] = useState<Visitor[]>([
    { id: '1', name: 'John Doe', type: 'family', purpose: 'Family Visit', time: '2:30 PM', status: 'pending' },
    { id: '2', name: 'Amazon Delivery', type: 'delivery', purpose: 'Package Delivery', time: '3:00 PM', status: 'pending' },
    { id: '3', name: 'Sarah Smith', type: 'guest', purpose: 'Social Visit', time: '4:15 PM', status: 'pending' },
    { id: '4', name: 'Cleaning Service', type: 'maid', purpose: 'Housekeeping', time: 'Yesterday', status: 'approved' },
  ]);

  const visitorTypes = [
    { type: 'family', label: 'Family / Relatives', icon: Users, color: 'bg-blue-500' },
    { type: 'guest', label: 'Guests', icon: UserCheck, color: 'bg-purple-500' },
    { type: 'maid', label: 'Caretakers', icon: Clock, color: 'bg-green-500' },
    { type: 'delivery', label: 'Delivery', icon: Package, color: 'bg-orange-500' },
    { type: 'service', label: 'Services', icon: Truck, color: 'bg-red-500' },
  ];

  const handleApprove = (id: string) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' as const } : v));
    toast.success('Visitor approved successfully');
  };

  const handleReject = (id: string) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: 'rejected' as const } : v));
    toast.error('Visitor rejected');
  };

  const handleGenerateQR = (visitor: Visitor) => {
    toast.success(`QR Code generated for ${visitor.name}`);
  };

  const filteredVisitors = visitors.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="bg-gradient-primary text-primary-foreground shadow-elevated">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/resident')}
            className="mb-4 text-primary-foreground hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Visitor Management</h1>
          <p className="text-primary-foreground/80 mt-1">Manage and approve visitor entries</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6 space-y-6">
        {/* Visitor Type Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {visitorTypes.map((vType) => (
            <Card key={vType.type} className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
              <CardContent className="pt-6 pb-4">
                <div className={`w-12 h-12 ${vType.color} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                  <vType.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium text-center">{vType.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search visitors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Visitor List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Recent Visitors</h2>
          {filteredVisitors.map((visitor) => (
            <Card key={visitor.id} className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{visitor.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {visitor.purpose} • {visitor.time}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={visitor.status === 'approved' ? 'default' : visitor.status === 'rejected' ? 'destructive' : 'secondary'}
                  >
                    {visitor.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {visitor.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(visitor.id)}
                        className="flex-1 bg-success hover:bg-success/90"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(visitor.id)}
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  {visitor.status === 'approved' && (
                    <Button
                      size="sm"
                      onClick={() => handleGenerateQR(visitor)}
                      className="w-full"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate QR Code
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Visitors;
