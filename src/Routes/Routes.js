import { createBrowserRouter } from 'react-router-dom';
import Auth from '../Layouts/Auth';
import Main from '../Layouts/Main';
import AddTask from '../Pages/AddTask';
import CompletedTasks from '../Pages/CompletedTasks';
import Login from '../Pages/Login';
import MyTasks from '../Pages/MyTasks';
import Register from '../Pages/Register';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <MyTasks />,
      },
      {
        path: '/my-tasks',
        element: <MyTasks />,
      },
      {
        path: '/add-task',
        element: <AddTask />,
      },
      {
        path: '/completed-tasks',
        element: <CompletedTasks />,
      },
    ],
  },
  {
    path: '/login',
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: '/register',
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
]);

export default router;
