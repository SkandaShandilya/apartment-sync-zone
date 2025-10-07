import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Heart, MessageCircle, AlertTriangle, Megaphone, Calendar, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

interface Post {
  id: string;
  type: 'alert' | 'announcement' | 'event' | 'poll';
  title: string;
  content: string;
  author: string;
  time: string;
  likes: number;
  comments: number;
}

const CommunityFeed = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');

  const posts: Post[] = [
    {
      id: '1',
      type: 'alert',
      title: 'Water Supply Maintenance',
      content: 'Water supply will be shut down tomorrow from 10 AM to 2 PM for maintenance work.',
      author: 'Admin',
      time: '2 hours ago',
      likes: 24,
      comments: 8,
    },
    {
      id: '2',
      type: 'announcement',
      title: 'New Gym Equipment',
      content: 'New treadmills and weights have been added to the gym. Happy working out!',
      author: 'Management',
      time: '5 hours ago',
      likes: 42,
      comments: 12,
    },
    {
      id: '3',
      type: 'event',
      title: 'Holi Celebration',
      content: 'Join us for the community Holi celebration on March 25th at the clubhouse!',
      author: 'Events Committee',
      time: '1 day ago',
      likes: 67,
      comments: 23,
    },
    {
      id: '4',
      type: 'poll',
      title: 'Weekend Yoga Classes',
      content: 'Should we organize weekend yoga classes? Vote now!',
      author: 'Wellness Committee',
      time: '2 days ago',
      likes: 35,
      comments: 18,
    },
  ];

  const getPostIcon = (type: string) => {
    const icons: Record<string, any> = {
      alert: AlertTriangle,
      announcement: Megaphone,
      event: Calendar,
      poll: BarChart3,
    };
    return icons[type] || Megaphone;
  };

  const getPostColor = (type: string) => {
    const colors: Record<string, string> = {
      alert: 'bg-destructive',
      announcement: 'bg-primary',
      event: 'bg-secondary',
      poll: 'bg-accent',
    };
    return colors[type] || 'bg-muted';
  };

  const handleLike = (postId: string) => {
    toast.success('Post liked!');
  };

  const handleComment = (postId: string) => {
    toast.info('Opening comments...');
  };

  const handleCreatePost = () => {
    toast.info('Create post feature - opens form dialog');
  };

  const filteredPosts = selectedTab === 'all' 
    ? posts 
    : posts.filter(p => p.type === selectedTab);

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
              <h1 className="text-2xl font-bold">Community Feed</h1>
              <p className="text-primary-foreground/80 mt-1">Stay updated with community news</p>
            </div>
            <Button
              size="sm"
              onClick={handleCreatePost}
              className="bg-white/20 hover:bg-white/30"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="alert">Alerts</TabsTrigger>
            <TabsTrigger value="announcement">News</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
            <TabsTrigger value="poll">Polls</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            {filteredPosts.map((post) => {
              const Icon = getPostIcon(post.type);
              return (
                <Card key={post.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${getPostColor(post.type)} rounded-xl flex items-center justify-center shrink-0`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base">{post.title}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {post.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {post.author} • {post.time}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{post.content}</p>
                    <div className="flex items-center gap-4 pt-3 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleComment(post.id)}
                        className="flex items-center gap-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.comments}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No posts in this category yet</p>
              </CardContent>
            </Card>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityFeed;
