import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle, MessageSquare } from 'lucide-react';

export default function DiscussionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');

  const discussion = {
    id: 1,
    title: 'G-code error: Unexpected M command in file',
    author: 'Mike Chen',
    category: 'G-code Error',
    content: 'I\'m getting an error when running my G-code file on my 3-axis CNC machine. The error message says "Unexpected M command" at line 234. The file was generated from Fusion 360. Has anyone encountered this issue before? How can I fix it?',
    solved: false,
    date: '2026-04-28',
  };

  const comments = [
    {
      id: 1,
      author: 'Sarah Johnson',
      content: 'This usually happens when the post-processor doesn\'t match your machine. Check your machine\'s supported M commands in the manual.',
      date: '2026-04-28',
    },
    {
      id: 2,
      author: 'Alex Turner',
      content: 'I had the same issue! Go to Fusion 360 settings and make sure you\'re using the correct post-processor for your specific CNC model.',
      date: '2026-04-28',
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => navigate('/discussion')}>
          ← Back to Discussions
        </Button>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="w-12 h-12">
                <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-2xl font-bold">{discussion.title}</h1>
                  {discussion.solved ? (
                    <Badge className="bg-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Solved
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Unsolved</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="font-medium">{discussion.author}</span>
                  <span>•</span>
                  <span>{discussion.date}</span>
                  <span>•</span>
                  <Badge variant="outline">{discussion.category}</Badge>
                </div>
                <p className="text-gray-700">{discussion.content}</p>
              </div>
            </div>

            {!discussion.solved && (
              <Button variant="outline" className="bg-green-50 border-green-200 text-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Solved
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              {comments.length} Comments
            </h2>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                  <Avatar>
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-3">Add Comment</h3>
              <Textarea
                placeholder="Share your thoughts or solution..."
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button className="mt-3">Post Comment</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="font-semibold mb-4">Related Discussions</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-sm">
                  <a href="#" className="text-blue-600 hover:underline">
                    Similar issue with M commands in G-code
                  </a>
                  <div className="text-gray-500">3 comments • 2026-04-20</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
