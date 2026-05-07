import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export default function AdminReportsPage() {
  const reports = [
    {
      id: 'RPT-001',
      type: 'File',
      item: 'gear_assembly.gcode',
      reason: 'Duplicate content',
      reporter: 'User123',
      date: '2026-04-28',
      status: 'Pending',
    },
    {
      id: 'RPT-002',
      type: 'Post',
      item: 'How to fix G-code errors',
      reason: 'Spam content',
      reporter: 'User456',
      date: '2026-04-27',
      status: 'Resolved',
    },
    {
      id: 'RPT-003',
      type: 'File',
      item: 'bracket_mount.stl',
      reason: 'Inappropriate content',
      reporter: 'User789',
      date: '2026-04-26',
      status: 'Pending',
    },
    {
      id: 'RPT-004',
      type: 'User',
      item: 'john_doe',
      reason: 'Abusive behavior',
      reporter: 'User321',
      date: '2026-04-25',
      status: 'Under Review',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports Management</h1>
          <p className="text-gray-600">Review and handle user-submitted reports</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Reports</CardTitle>
            <CardDescription>User-submitted content and behavior reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Reported Item</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-mono text-sm">{report.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{report.item}</TableCell>
                    <TableCell>{report.reason}</TableCell>
                    <TableCell>{report.reporter}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          report.status === 'Resolved'
                            ? 'default'
                            : report.status === 'Pending'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Review</Button>
                        <Button size="sm">Resolve</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
