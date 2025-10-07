import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Filter, ShoppingBag, Home as HomeIcon, Wrench, Search as SearchIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  title: string;
  category: 'sale' | 'rent' | 'service' | 'lost';
  price: string;
  seller: string;
  image: string;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All', icon: ShoppingBag },
    { id: 'sale', label: 'For Sale', icon: ShoppingBag },
    { id: 'rent', label: 'Rentals', icon: HomeIcon },
    { id: 'service', label: 'Services', icon: Wrench },
    { id: 'lost', label: 'Lost & Found', icon: SearchIcon },
  ];

  const products: Product[] = [
    { id: '1', title: 'Sofa Set - 3 Seater', category: 'sale', price: '₹15,000', seller: 'A-201', image: '🛋️' },
    { id: '2', title: 'Bicycle for Kids', category: 'sale', price: '₹2,500', seller: 'B-105', image: '🚲' },
    { id: '3', title: 'Parking Space', category: 'rent', price: '₹1,500/mo', seller: 'C-304', image: '🅿️' },
    { id: '4', title: 'Found: Blue Umbrella', category: 'lost', price: 'Free', seller: 'D-102', image: '☂️' },
    { id: '5', title: 'Laptop Repair Services', category: 'service', price: '₹500', seller: 'A-401', image: '💻' },
    { id: '6', title: 'Study Table', category: 'sale', price: '₹3,000', seller: 'B-203', image: '📚' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleViewProduct = (product: Product) => {
    toast.success(`Viewing ${product.title}`);
  };

  const handleAddListing = () => {
    toast.info('Add listing feature - opens form dialog');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      sale: 'bg-blue-500',
      rent: 'bg-purple-500',
      service: 'bg-green-500',
      lost: 'bg-orange-500',
    };
    return colors[category] || 'bg-gray-500';
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Marketplace</h1>
              <p className="text-primary-foreground/80 mt-1">Buy, sell, and rent within your community</p>
            </div>
            <Button
              size="sm"
              onClick={handleAddListing}
              className="bg-white/20 hover:bg-white/30"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Listing
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6 space-y-6">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-elevated'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <category.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader className="pb-3">
                <div className="text-6xl text-center mb-3">{product.image}</div>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">{product.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">By {product.seller}</p>
                  </div>
                  <Badge className={getCategoryColor(product.category)}>
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-primary">{product.price}</p>
                  <Button
                    size="sm"
                    onClick={() => handleViewProduct(product)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="py-12 text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No listings in this category yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
