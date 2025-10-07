import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Shield, Users, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}`);
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="text-center max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-elevated">
          <Building2 className="h-10 w-10 text-primary-foreground" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Community Manager
          </h1>
          <p className="text-xl text-muted-foreground">
            Your all-in-one apartment management solution
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <div className="p-6 rounded-2xl bg-gradient-card shadow-card">
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">For Residents</h3>
            <p className="text-sm text-muted-foreground">
              Manage visitors, book facilities, and stay connected
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-gradient-card shadow-card">
            <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">For Guards</h3>
            <p className="text-sm text-muted-foreground">
              Control entry access and manage visitor logs
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-gradient-card shadow-card">
            <Building2 className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">For Admins</h3>
            <p className="text-sm text-muted-foreground">
              Oversee community operations and analytics
            </p>
          </div>
        </div>

        <Button
          size="lg"
          onClick={() => navigate('/login')}
          className="mt-8 h-14 px-8 text-lg bg-gradient-primary hover:opacity-90 transition-opacity shadow-elevated"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
