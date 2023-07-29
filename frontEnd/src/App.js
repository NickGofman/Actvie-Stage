import React from 'react';

import {
  LoginPage,
  RegisterPage,
  PageLayout,
  MusicianMyEventsPage,
  ProfilePage,
  ChangePassword,
  ForgotPassword,
  BusinessAllEvents,
  BusinessHomePage,
  BusinessReportPage,
  MusicianHomePage,
  Page404,
} from './pages/exportPages.js';
import { ThemeProvider } from '@material-tailwind/react';
import { ReactQueryDevtools } from 'react-query/devtools';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './components/context/authContext';
import { QueryClientProvider, QueryClient } from 'react-query';
const queryClient = new QueryClient();

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children, isAdmin, isMusician }) => {
    console.log('isAdmin:', isAdmin, 'isMusician"', isMusician);
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    if (isAdmin) {
      console.log('isAdmin');

      return currentUser.Role === 'admin' ? children : <Navigate to="/*" />;
    }
    if (isMusician) {
      console.log('isMusician');

      return currentUser.Role === 'user' ? children : <Navigate to="/*" />;
    }

    return children;
  };
  const router = createBrowserRouter([
    {
      path: '/admin',
      element: (
        <ProtectedRoute isAdmin>
          <PageLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/admin',
          element: <BusinessHomePage />,
        },
        {
          path: '/admin/events',
          element: <BusinessAllEvents />,
        },
        {
          path: '/admin/profile/:id',
          element: <ProfilePage />,
        },
        {
          path: '/admin/reports',
          element: <BusinessReportPage />,
        },
      ],
    },
    {
      path: '/user',
      element: (
        <ProtectedRoute isMusician>
          <PageLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/user',
          element: <MusicianHomePage />,
        },
        {
          path: '/user/profile/:id',
          element: <ProfilePage />,
        },
        {
          path: '/user/myEvents',
          element: <MusicianMyEventsPage />,
        },
      ],
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/forgetPassword',
      element: <ForgotPassword />,
    },
    {
      path: '/changePassword',
      element: <ChangePassword />,
    },
    {
      path: '/*',
      element: <Page404 />,
    },
  ]);
  const theme = {
    select: {
      styles: {
        base: {
          menu: {
            maxHeight: 'max-h-48',
          },
        },
      },
    },
  };
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
