import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle, XCircle, Download, Coins, MessageSquare, AlertTriangle } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      title: 'File Approved',
      message: 'Your file "gear_assembly.gcode" has been approved and is now available for download.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'error',
      icon: XCircle,
      title: 'File Rejected',
      message: 'Your file "bracket_mount.stl" was rejected. Reason: Duplicate content detected.',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'info',
      icon: Coins,
      title: 'Credits Added',
      message: 'You earned 50 credits from your approved file upload.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 4,
      type: 'success',
      icon: Download,
      title: 'Download Successful',
      message: 'You successfully downloaded "phone_stand.stl" for 5 credits.',
      time: '2 days ago',
      read: true,
    },
    {
      id: 5,
      type: 'info',
      icon: MessageSquare,
      title: 'Custom Request Accepted',
      message: 'Designer Sarah Johnson has accepted your custom work request.',
      time: '3 days ago',
      read: true,
    },
    {
      id: 6,
      type: 'warning',
      icon: AlertTriangle,
      title: 'Admin Warning',
      message: 'Please review our community guidelines. Your recent post was flagged.',
      time: '1 week ago',
      read: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-gray-600">Stay updated with your GCodeHub activity</p>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            const bgColor =
              notification.type === 'success'
                ? 'bg-green-100'
                : notification.type === 'error'
                ? 'bg-red-100'
                : notification.type === 'warning'
                ? 'bg-yellow-100'
                : 'bg-blue-100';
            const iconColor =
              notification.type === 'success'
                ? 'text-green-600'
                : notification.type === 'error'
                ? 'text-red-600'
                : notification.type === 'warning'
                ? 'text-yellow-600'
                : 'text-blue-600';

            return (
              <Card
                key={notification.id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-4 border-l-blue-600' : ''
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <span className="text-sm text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <Badge className="shrink-0">New</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
