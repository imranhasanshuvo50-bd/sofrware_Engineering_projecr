import { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Filter, Star, Download, FileText } from 'lucide-react';

export default function BrowseFilesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const files = [
    {
      id: 1,
      title: 'Parametric Gear Assembly',
      type: 'GCODE',
      machine: '3-axis CNC',
      material: 'Aluminum',
      rating: 4.8,
      credits: 10,
      downloads: 245,
      verified: true,
    },
    {
      id: 2,
      title: 'Phone Stand - Modern Design',
      type: 'STL',
      machine: '3D Printer',
      material: 'PLA',
      rating: 4.9,
      credits: 5,
      downloads: 892,
      verified: true,
    },
    {
      id: 3,
      title: 'Custom Bracket Mount',
      type: 'OBJ',
      machine: '3-axis CNC',
      material: 'Steel',
      rating: 4.7,
      credits: 8,
      downloads: 156,
      verified: true,
    },
    {
      id: 4,
      title: 'Enclosure Panel Design',
      type: 'GCODE',
      machine: '2-axis CNC',
      material: 'Acrylic',
      rating: 4.6,
      credits: 12,
      downloads: 78,
      verified: false,
    },
    {
      id: 5,
      title: 'Decorative Vase',
      type: 'STL',
      machine: '3D Printer',
      material: 'PLA',
      rating: 4.9,
      credits: 6,
      downloads: 634,
      verified: true,
    },
    {
      id: 6,
      title: 'Router Template',
      type: 'GCODE',
      machine: '3-axis CNC',
      material: 'Wood',
      rating: 4.8,
      credits: 15,
      downloads: 312,
      verified: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Files</h1>
          <p className="text-gray-600">Discover and download G-code and 3D model files</p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search files by name, category, or description..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3d-printing">3D Printing</SelectItem>
                  <SelectItem value="cnc">CNC</SelectItem>
                  <SelectItem value="laser">Laser Cutting</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="File Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stl">STL</SelectItem>
                  <SelectItem value="obj">OBJ</SelectItem>
                  <SelectItem value="gcode">GCODE</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Machine Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3d-printer">3D Printer</SelectItem>
                  <SelectItem value="3-axis">3-axis CNC</SelectItem>
                  <SelectItem value="2-axis">2-axis CNC</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pla">PLA</SelectItem>
                  <SelectItem value="abs">ABS</SelectItem>
                  <SelectItem value="aluminum">Aluminum</SelectItem>
                  <SelectItem value="steel">Steel</SelectItem>
                  <SelectItem value="wood">Wood</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Credit Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-5">0-5 Credits</SelectItem>
                  <SelectItem value="6-10">6-10 Credits</SelectItem>
                  <SelectItem value="11-20">11-20 Credits</SelectItem>
                  <SelectItem value="20+">20+ Credits</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">{files.length} files found</p>
          <Select defaultValue="popular">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {files.map((file) => (
            <Card key={file.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/file/${file.id}`)}>
              <CardHeader>
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-gray-400" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">{file.title}</CardTitle>
                  {file.verified && (
                    <Badge className="bg-green-500 shrink-0">Verified</Badge>
                  )}
                </div>
                <CardDescription className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{file.type}</Badge>
                    <Badge variant="outline">{file.machine}</Badge>
                  </div>
                  <div className="text-sm">Material: {file.material}</div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{file.rating}</span>
                    <span className="text-gray-500 text-sm">({file.downloads})</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">{file.credits} Credits</div>
                </div>
                <Button className="w-full" onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/file/${file.id}`);
                }}>
                  <Download className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
