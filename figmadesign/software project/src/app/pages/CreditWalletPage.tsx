import { useAuth } from '../contexts/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Wallet, TrendingUp, TrendingDown, Info } from 'lucide-react';

export default function CreditWalletPage() {
  const { user } = useAuth();

  const transactions = [
    { id: 'TXN-001', type: 'Earned', amount: 50, description: 'File upload approved: gear_assembly.gcode', date: '2026-04-28' },
    { id: 'TXN-002', type: 'Spent', amount: -10, description: 'Downloaded: Phone Stand Design', date: '2026-04-27' },
    { id: 'TXN-003', type: 'Earned', amount: 30, description: 'File upload approved: bracket_mount.stl', date: '2026-04-25' },
    { id: 'TXN-004', type: 'Spent', amount: -8, description: 'Downloaded: CNC Router Template', date: '2026-04-24' },
    { id: 'TXN-005', type: 'Earned', amount: 50, description: 'Registration bonus', date: '2026-04-20' },
    { id: 'TXN-006', type: 'Earned', amount: 40, description: 'File upload approved: custom_part.obj', date: '2026-04-18' },
    { id: 'TXN-007', type: 'Spent', amount: -12, description: 'Downloaded: Enclosure Panel Design', date: '2026-04-15' },
  ];

  const totalEarned = transactions.filter(t => t.type === 'Earned').reduce((sum, t) => sum + t.amount, 0);
  const totalSpent = Math.abs(transactions.filter(t => t.type === 'Spent').reduce((sum, t) => sum + t.amount, 0));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Credit Wallet</h1>
          <p className="text-gray-600">Manage your credits and view transaction history</p>
        </div>

        {/* Credit Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
              <Wallet className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{user?.credits}</div>
              <p className="text-xs text-gray-500 mt-1">Available credits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{totalEarned}</div>
              <p className="text-xs text-gray-500 mt-1">From uploads and activities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingDown className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{totalSpent}</div>
              <p className="text-xs text-gray-500 mt-1">On downloads</p>
            </CardContent>
          </Card>
        </div>

        {/* How Credits Work */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              <CardTitle>How Credits Work</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
              <p><strong>Earn credits</strong> by uploading quality files that get approved by our validation system</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
              <p><strong>Spend credits</strong> to download files shared by other users</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
              <p>Higher quality and more complex files may require more credits to download</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
              <p>New users receive 50 welcome credits to get started</p>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your complete credit activity log</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === 'Earned' ? 'default' : 'secondary'}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={transaction.amount > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-gray-600">{transaction.date}</TableCell>
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
