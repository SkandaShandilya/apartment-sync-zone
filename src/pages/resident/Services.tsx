import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, MessageCircle, Droplet, Zap, Wrench, Shield, Truck, ExternalLink, AlertCircle, Flame, Hospital } from 'lucide-react';
import { toast } from 'sonner';

const Services = () => {
  const navigate = useNavigate();

  const internalServices = [
    { name: 'Housekeeping', icon: Truck, phone: '+91 98765 43210', color: 'bg-blue-500' },
    { name: 'Electrician', icon: Zap, phone: '+91 98765 43211', color: 'bg-yellow-500' },
    { name: 'Plumber', icon: Droplet, phone: '+91 98765 43212', color: 'bg-cyan-500' },
    { name: 'Security Office', icon: Shield, phone: '+91 98765 43213', color: 'bg-red-500' },
    { name: 'Maintenance', icon: Wrench, phone: '+91 98765 43214', color: 'bg-gray-500' },
  ];

  const externalServices = [
    { name: 'Swiggy', url: 'https://swiggy.com', icon: '🍔' },
    { name: 'Zomato', url: 'https://zomato.com', icon: '🍕' },
    { name: 'Uber', url: 'https://uber.com', icon: '🚗' },
    { name: 'Practo', url: 'https://practo.com', icon: '⚕️' },
  ];

  const emergencyServices = [
    { name: 'Police', phone: '100', icon: Shield, color: 'bg-blue-600' },
    { name: 'Fire Brigade', phone: '101', icon: Flame, color: 'bg-red-600' },
    { name: 'Hospital', phone: '102', icon: Hospital, color: 'bg-green-600' },
    { name: 'Emergency', phone: '112', icon: AlertCircle, color: 'bg-orange-600' },
  ];

  const handleCall = (phone: string, name: string) => {
    toast.success(`Calling ${name}...`);
  };

  const handleWhatsApp = (phone: string, name: string) => {
    toast.success(`Opening WhatsApp for ${name}...`);
  };

  const handleExternalLink = (name: string) => {
    toast.info(`Opening ${name}...`);
  };

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
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-primary-foreground/80 mt-1">Quick access to community and external services</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6 space-y-6">
        {/* Emergency Services */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <h2 className="text-lg font-semibold">Emergency Services</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {emergencyServices.map((service) => (
              <Card key={service.name} className="shadow-card">
                <CardContent className="pt-4 pb-3">
                  <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-center mb-2">{service.name}</p>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleCall(service.phone, service.name)}
                    className="w-full"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    {service.phone}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Internal Services */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Community Services</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {internalServices.map((service) => (
              <Card key={service.name} className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base">{service.name}</CardTitle>
                      <p className="text-sm text-muted-foreground truncate">{service.phone}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleCall(service.phone, service.name)}
                      className="flex-1"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleWhatsApp(service.phone, service.name)}
                      className="flex-1"
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* External Services */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {externalServices.map((service) => (
              <Card key={service.name} className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
                <CardContent className="pt-6 pb-4" onClick={() => handleExternalLink(service.name)}>
                  <div className="text-4xl mb-3 text-center">{service.icon}</div>
                  <p className="text-sm font-medium text-center mb-3">{service.name}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Open
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
