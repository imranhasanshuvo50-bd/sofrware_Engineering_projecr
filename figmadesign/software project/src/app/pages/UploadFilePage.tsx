import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Upload, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function UploadFilePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [fileType, setFileType] = useState('');
  const [machineType, setMachineType] = useState('');
  const [material, setMaterial] = useState('');
  const [credits, setCredits] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">File Submitted Successfully!</h2>
              <p className="text-gray-600 mb-8">
                Your file has been submitted for validation. You'll be notified once the review is complete.
              </p>

              <div className="max-w-md mx-auto">
                <Card className="bg-blue-50 border-blue-200 mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Validation Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Upload Complete</div>
                          <div className="text-sm text-gray-600">File received successfully</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Duplicate Check</div>
                          <div className="text-sm text-gray-600">Verifying uniqueness</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Quality Check</div>
                          <div className="text-sm text-gray-600">Automated validation</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Admin Approval</div>
                          <div className="text-sm text-gray-600">Final review pending</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4 justify-center">
                  <Button onClick={() => setSubmitted(false)}>
                    Upload Another File
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Upload File</h1>
          <p className="text-gray-600">Share your G-code or 3D model file with the community</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>File Information</CardTitle>
              <CardDescription>Provide details about your file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">File Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Parametric Gear Assembly"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your file, its purpose, and any special features..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3d-printing">3D Printing</SelectItem>
                      <SelectItem value="cnc-milling">CNC Milling</SelectItem>
                      <SelectItem value="laser-cutting">Laser Cutting</SelectItem>
                      <SelectItem value="prototyping">Prototyping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileType">File Type *</Label>
                  <Select value={fileType} onValueChange={setFileType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select file type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stl">STL</SelectItem>
                      <SelectItem value="obj">OBJ</SelectItem>
                      <SelectItem value="gcode">GCODE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="machineType">Machine Type *</Label>
                  <Select value={machineType} onValueChange={setMachineType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select machine type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3d-printer">3D Printer</SelectItem>
                      <SelectItem value="3-axis">3-axis CNC</SelectItem>
                      <SelectItem value="2-axis">2-axis CNC</SelectItem>
                      <SelectItem value="laser">Laser Cutter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material">Material Type *</Label>
                  <Select value={material} onValueChange={setMaterial} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pla">PLA</SelectItem>
                      <SelectItem value="abs">ABS</SelectItem>
                      <SelectItem value="petg">PETG</SelectItem>
                      <SelectItem value="aluminum">Aluminum</SelectItem>
                      <SelectItem value="steel">Steel</SelectItem>
                      <SelectItem value="wood">Wood</SelectItem>
                      <SelectItem value="acrylic">Acrylic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credits">Required Credits *</Label>
                  <Input
                    id="credits"
                    type="number"
                    min="1"
                    placeholder="e.g., 10"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">Credits users will pay to download your file</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Main File *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">
                    {file ? file.name : 'Drag and drop your file here, or click to browse'}
                  </p>
                  <p className="text-sm text-gray-500">Supported formats: STL, OBJ, GCODE (Max 50MB)</p>
                  <input
                    type="file"
                    className="hidden"
                    accept=".stl,.obj,.gcode"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Thumbnail Image (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">
                    {thumbnail ? thumbnail.name : 'Upload a preview image of your file'}
                  </p>
                  <p className="text-sm text-gray-500">Supported formats: JPG, PNG (Max 5MB)</p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-4">
            <Button type="submit" size="lg" className="flex-1">
              <Upload className="w-4 h-4 mr-2" />
              Submit for Validation
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => window.history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
