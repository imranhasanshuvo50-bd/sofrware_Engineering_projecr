import { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Plus, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

export default function DiscussionPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const discussions = [
    {
      id: 1,
      title: 'G-code error: Unexpected M command in file',
      author: 'Mike Chen',
      category: 'G-code Error',
      comments: 12,
      solved: true,
      date: '2026-04-28',
    },
    {
      id: 2,
      title: 'Best material for outdoor 3D prints?',
      author: 'Sarah Johnson',
      category: 'Material Issue',
      comments: 8,
      solved: false,
      date: '2026-04-27',
    },
    {
      id: 3,
      title: 'CNC machine calibration tips needed',
      author: 'Alex Turner',
      category: 'CNC',
      comments: 15,
      solved: true,
      date: '2026-04-26',
    },
    {
      id: 4,
      title: 'Layer adhesion problems with PLA',
      author: 'Emma Davis',
      category: '3D Printer',
      comments: 6,
      solved: false,
      date: '2026-04-25',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Community Discussion</h1>
            <p className="text-gray-600">Ask questions and help others solve problems</p>
          </div>
          <Button onClick={() => navigate('/discussion/new')}>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="cnc">CNC</TabsTrigger>
            <TabsTrigger value="3d-printer">3D Printer</TabsTrigger>
            <TabsTrigger value="gcode">G-code Error</TabsTrigger>
            <TabsTrigger value="material">Material Issue</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {discussions.map((discussion) => (
              <Card
                key={discussion.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/discussion/${discussion.id}`)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{discussion.title}</h3>
                        {discussion.solved ? (
                          <Badge className="bg-green-500 shrink-0">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Solved
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="shrink-0">
                            <XCircle className="w-3 h-3 mr-1" />
                            Unsolved
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>{discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.date}</span>
                        <span>•</span>
                        <Badge variant="outline">{discussion.category}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="w-4 h-4" />
                        <span>{discussion.comments} comments</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
