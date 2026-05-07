import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function AdminFileReviewPage() {
  const [rejectionReason, setRejectionReason] = useState('');

  const pendingFile = {
    id: 1,
    name: 'gear_assembly.gcode',
    uploader: 'John Doe',
    uploadDate: '2026-04-30',
    category: '3D Printing',
    fileType: 'GCODE',
    machineType: '3-axis CNC',
    material: 'Aluminum',
    credits: 10,
    size: '2.4 MB',
    qualityCheck: 'Passed',
    duplicateCheck: 'No duplicates found',
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">File Review</h1>
          <p className="text-gray-600">Validate and approve uploaded files</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* File Preview */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="w-32 h-32 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">{pendingFile.name}</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Uploader:</span>
                    <p className="font-medium">{pendingFile.uploader}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Upload Date:</span>
                    <p className="font-medium">{pendingFile.uploadDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <p className="font-medium">{pendingFile.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">File Type:</span>
                    <p className="font-medium">{pendingFile.fileType}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Machine Type:</span>
                    <p className="font-medium">{pendingFile.machineType}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Material:</span>
                    <p className="font-medium">{pendingFile.material}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Required Credits:</span>
                    <p className="font-medium">{pendingFile.credits}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">File Size:</span>
                    <p className="font-medium">{pendingFile.size}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Validation Results */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Validation Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-sm">Quality Check</div>
                    <div className="text-xs text-gray-600">{pendingFile.qualityCheck}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-sm">Duplicate Check</div>
                    <div className="text-xs text-gray-600">{pendingFile.duplicateCheck}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve File
                </Button>

                <div className="space-y-2">
                  <Textarea
                    placeholder="Reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={3}
                  />
                  <Button variant="destructive" className="w-full">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
