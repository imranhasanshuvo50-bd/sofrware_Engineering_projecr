import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Upload, Download, Coins, Star, FileText, Users, MessageSquare } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const recentFiles = [
    { id: 1, name: 'gear_assembly.gcode', type: 'GCODE', status: 'Verified', uploads: 142 },
    { id: 2, name: 'bracket_mount.stl', type: 'STL', status: 'Pending', uploads: 0 },
    { id: 3, name: 'custom_part.obj', type: 'OBJ', status: 'Verified', uploads: 89 },
  ];

  const recommendedFiles = [
    { id: 1, name: 'Phone Stand', type: 'STL', credits: 5, rating: 4.8 },
    { id: 2, name: 'CNC Router Template', type: 'GCODE', credits: 10, rating: 4.9 },
    { id: 3, name: 'Enclosure Design', type: 'STL', credits: 8, rating: 4.7 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle>Welcome back, {user?.name}!</CardTitle>
            <CardDescription className="text-blue-100">
              Here's what's happening with your GCodeHub account today
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Uploaded Files</CardTitle>
              <Upload className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-gray-500 mt-1">+3 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-gray-500 mt-1">+12 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Credits</CardTitle>
              <Coins className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.credits}</div>
              <p className="text-xs text-gray-500 mt-1">Available balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reviews</CardTitle>
              <Star className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-gray-500 mt-1">Average rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button onClick={() => navigate('/upload')}>
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            <Button variant="outline" onClick={() => navigate('/browse')}>
              <FileText className="w-4 h-4 mr-2" />
              Browse Files
            </Button>
            <Button variant="outline" onClick={() => navigate('/designers')}>
              <Users className="w-4 h-4 mr-2" />
              Request Designer
            </Button>
          </CardContent>
        </Card>

        {/* Recent Uploaded Files */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Uploaded Files</CardTitle>
            <CardDescription>Files you've uploaded recently</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{file.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={file.status === 'Verified' ? 'default' : 'secondary'}>
                        {file.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{file.uploads}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recommended Files */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Popular files you might be interested in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {recommendedFiles.map((file) => (
                <Card key={file.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-400" />
                    </div>
                    <CardTitle className="text-base">{file.name}</CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <Badge variant="outline">{file.type}</Badge>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {file.rating}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{file.credits} Credits</span>
                      <Button size="sm">Download</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
