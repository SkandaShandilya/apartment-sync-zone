import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Dumbbell, Waves, Home, Trophy, Car, Calendar, QrCode } from 'lucide-react';
import { toast } from 'sonner';

interface Booking {
  id: string;
  facility: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'pending';
}

const Facilities = () => {
  const navigate = useNavigate();
  const [selectedFacility, setSelectedFacility] = useState('gym');
  const [selectedDate, setSelectedDate] = useState('2025-10-15');
  const [selectedTime, setSelectedTime] = useState('morning');
  
  const [bookings, setBookings] = useState<Booking[]>([
    { id: '1', facility: 'Gym', date: '2025-10-14', timeSlot: 'Morning (6 AM - 10 AM)', status: 'confirmed' },
    { id: '2', facility: 'Swimming Pool', date: '2025-10-16', timeSlot: 'Evening (5 PM - 8 PM)', status: 'confirmed' },
  ]);

  const facilities = [
    { id: 'gym', name: 'Gym', icon: Dumbbell, color: 'bg-red-500' },
    { id: 'pool', name: 'Swimming Pool', icon: Waves, color: 'bg-blue-500' },
    { id: 'clubhouse', name: 'Clubhouse', icon: Home, color: 'bg-purple-500' },
    { id: 'court', name: 'Sports Court', icon: Trophy, color: 'bg-green-500' },
    { id: 'parking', name: 'Guest Parking', icon: Car, color: 'bg-gray-500' },
  ];

  const timeSlots = [
    { id: 'morning', label: 'Morning (6 AM - 10 AM)' },
    { id: 'afternoon', label: 'Afternoon (2 PM - 5 PM)' },
    { id: 'evening', label: 'Evening (5 PM - 8 PM)' },
  ];

  const handleBookSlot = () => {
    const selectedFacilityName = facilities.find(f => f.id === selectedFacility)?.name || '';
    const selectedTimeLabel = timeSlots.find(t => t.id === selectedTime)?.label || '';
    
    const newBooking: Booking = {
      id: Date.now().toString(),
      facility: selectedFacilityName,
      date: selectedDate,
      timeSlot: selectedTimeLabel,
      status: 'pending',
    };

    setBookings(prev => [newBooking, ...prev]);
    toast.success(`Booking request submitted for ${selectedFacilityName}`);
  };

  const handleViewQR = (booking: Booking) => {
    toast.success(`QR Code for ${booking.facility} booking`);
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
          <h1 className="text-2xl font-bold">Facility Booking</h1>
          <p className="text-primary-foreground/80 mt-1">Reserve community facilities and amenities</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6 space-y-6">
        {/* Facility Selection */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Book a Facility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {facilities.map((facility) => (
                <button
                  key={facility.id}
                  onClick={() => setSelectedFacility(facility.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                    selectedFacility === facility.id
                      ? 'bg-primary text-primary-foreground shadow-elevated scale-105'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <facility.icon className="h-6 w-6" />
                  <span className="text-xs font-medium text-center">{facility.name}</span>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full h-12 px-4 rounded-lg border border-input bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Select Time Slot</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot.id} value={slot.id}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleBookSlot}
                className="w-full h-12 bg-gradient-primary hover:opacity-90"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Slot
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Bookings */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">My Bookings</h2>
          {bookings.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No bookings yet</p>
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} className="shadow-card">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.facility}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p className="text-sm text-muted-foreground">{booking.timeSlot}</p>
                    </div>
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                  </div>
                  {booking.status === 'confirmed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewQR(booking)}
                      className="w-full"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      View QR Code
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
