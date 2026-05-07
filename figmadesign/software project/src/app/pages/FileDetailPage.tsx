import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Star, Download, FileText, User, Calendar, Shield, Copy } from 'lucide-react';

export default function FileDetailPage() {
  const { id } = useParams();
  const { user, updateCredits } = useAuth();
  const navigate = useNavigate();

  const file = {
    id: 1,
    title: 'Parametric Gear Assembly',
    description: 'A fully parametric gear assembly designed for 3-axis CNC machines. This design includes multiple gear sizes and can be easily customized for different applications. Perfect for mechanical projects, robotics, and prototyping.',
    type: 'GCODE',
    category: '3D Printing',
    machine: '3-axis CNC',
    material: 'Aluminum',
    rating: 4.8,
    credits: 10,
    downloads: 245,
    verified: true,
    duplicate: false,
    uploadedBy: 'Sarah Johnson',
    uploadedDate: '2026-03-15',
    fileSize: '2.4 MB',
  };

  const reviews = [
    { id: 1, user: 'Mike Chen', rating: 5, comment: 'Excellent design! Worked perfectly on my CNC machine.', date: '2026-04-20' },
    { id: 2, user: 'Emma Davis', rating: 4, comment: 'Good quality file, minor adjustments needed for my setup.', date: '2026-04-18' },
    { id: 3, user: 'Alex Turner', rating: 5, comment: 'Great detail and precision. Highly recommended!', date: '2026-04-15' },
  ];

  const relatedFiles = [
    { id: 2, title: 'Bearing Mount', type: 'STL', credits: 8, rating: 4.7 },
    { id: 3, title: 'Shaft Coupling', type: 'GCODE', credits: 12, rating: 4.9 },
    { id: 4, title: 'Gear Box Housing', type: 'OBJ', credits: 15, rating: 4.6 },
  ];

  const handleDownload = () => {
    if (user && user.credits >= file.credits) {
      updateCredits(-file.credits);
      alert(`File downloaded! ${file.credits} credits deducted.`);
    } else {
      alert('Insufficient credits. Please add more credits to your wallet.');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => navigate('/browse')}>
          ← Back to Browse
        </Button>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - File Preview */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="w-32 h-32 text-gray-400" />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{file.title}</h1>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge>{file.type}</Badge>
                      {file.verified && <Badge className="bg-green-500">Verified</Badge>}
                      {!file.duplicate && <Badge variant="outline">No Duplicates</Badge>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{file.credits}</div>
                    <div className="text-gray-600">Credits</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{file.description}</p>
              </CardContent>
            </Card>

            {/* Technical Details */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{file.category}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">File Type:</span>
                  <span className="font-medium">{file.type}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Machine Compatibility:</span>
                  <span className="font-medium">{file.machine}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Material Recommendation:</span>
                  <span className="font-medium">{file.material}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">File Size:</span>
                  <span className="font-medium">{file.fileSize}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Downloads:</span>
                  <span className="font-medium">{file.downloads}</span>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews & Ratings</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${star <= Math.round(file.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{file.rating} out of 5</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{review.user}</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Related Files */}
            <Card>
              <CardHeader>
                <CardTitle>Related Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {relatedFiles.map((related) => (
                    <Card key={related.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/file/${related.id}`)}>
                      <CardHeader>
                        <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <CardTitle className="text-sm">{related.title}</CardTitle>
                        <CardDescription className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">{related.type}</Badge>
                          <span className="flex items-center gap-1 text-xs">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {related.rating}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm font-medium">{related.credits} Credits</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Action Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Download File</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{file.credits}</div>
                  <div className="text-sm text-gray-600">Credits Required</div>
                </div>
                <Button className="w-full" size="lg" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Now
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  You have {user?.credits} credits available
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uploaded By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarFallback>{file.uploadedBy.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{file.uploadedBy}</div>
                    <div className="text-sm text-gray-500">Designer</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Uploaded: {file.uploadedDate}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield className="w-4 h-4" />
                    Quality Status: {file.verified ? 'Verified' : 'Pending'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
