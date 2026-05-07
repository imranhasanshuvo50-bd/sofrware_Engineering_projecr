import { createBrowserRouter } from 'react-router';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BrowseFilesPage from './pages/BrowseFilesPage';
import FileDetailPage from './pages/FileDetailPage';
import UploadFilePage from './pages/UploadFilePage';
import CreditWalletPage from './pages/CreditWalletPage';
import DiscussionPage from './pages/DiscussionPage';
import DiscussionDetailPage from './pages/DiscussionDetailPage';
import DesignerHiringPage from './pages/DesignerHiringPage';
import CustomRequestPage from './pages/CustomRequestPage';
import DesignerDashboardPage from './pages/DesignerDashboardPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminFileReviewPage from './pages/AdminFileReviewPage';
import AdminUserManagementPage from './pages/AdminUserManagementPage';
import AdminReportsPage from './pages/AdminReportsPage';
import NotificationsPage from './pages/NotificationsPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/register',
    Component: RegisterPage,
  },
  {
    path: '/dashboard',
    Component: DashboardPage,
  },
  {
    path: '/browse',
    Component: BrowseFilesPage,
  },
  {
    path: '/file/:id',
    Component: FileDetailPage,
  },
  {
    path: '/upload',
    Component: UploadFilePage,
  },
  {
    path: '/wallet',
    Component: CreditWalletPage,
  },
  {
    path: '/discussion',
    Component: DiscussionPage,
  },
  {
    path: '/discussion/:id',
    Component: DiscussionDetailPage,
  },
  {
    path: '/designers',
    Component: DesignerHiringPage,
  },
  {
    path: '/custom-request',
    Component: CustomRequestPage,
  },
  {
    path: '/designer-dashboard',
    Component: DesignerDashboardPage,
  },
  {
    path: '/profile',
    Component: ProfilePage,
  },
  {
    path: '/notifications',
    Component: NotificationsPage,
  },
  {
    path: '/admin',
    Component: AdminDashboardPage,
  },
  {
    path: '/admin/files',
    Component: AdminFileReviewPage,
  },
  {
    path: '/admin/users',
    Component: AdminUserManagementPage,
  },
  {
    path: '/admin/reports',
    Component: AdminReportsPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
