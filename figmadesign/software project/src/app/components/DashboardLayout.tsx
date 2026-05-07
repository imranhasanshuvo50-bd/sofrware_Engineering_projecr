import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  LayoutDashboard,
  Files,
  Upload,
  Wallet,
  MessageSquare,
  Users,
  User,
  Bell,
  LogOut,
  Search,
  Settings,
  FileText,
  Shield
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/browse', icon: Files, label: 'Browse Files' },
    { to: '/upload', icon: Upload, label: 'Upload File' },
    { to: '/wallet', icon: Wallet, label: 'Credit Wallet' },
    { to: '/discussion', icon: MessageSquare, label: 'Discussion' },
    { to: '/designers', icon: Users, label: 'Hire Designer' },
  ];

  const designerLinks = [
    { to: '/designer-dashboard', icon: LayoutDashboard, label: 'Designer Dashboard' },
    { to: '/custom-requests', icon: FileText, label: 'Custom Requests' },
  ];

  const adminLinks = [
    { to: '/admin', icon: Shield, label: 'Admin Dashboard' },
    { to: '/admin/files', icon: Files, label: 'File Review' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
    { to: '/admin/reports', icon: MessageSquare, label: 'Reports' },
  ];

  let navLinks = userLinks;
  if (user?.role === 'designer') {
    navLinks = [...userLinks, ...designerLinks];
  } else if (user?.role === 'admin') {
    navLinks = adminLinks;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
              <span className="font-bold">GCodeHub</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 max-w-md flex-1">
              <Search className="w-4 h-4 text-gray-400" />
              <Input placeholder="Search files..." className="border-0 shadow-none" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm">
              {user?.credits} Credits
            </div>
            <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
              <Bell className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {user?.name.charAt(0)}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
