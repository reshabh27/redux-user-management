
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "cropperjs/dist/cropper.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from './pages/Login';
import  SignUp  from './pages/SignUp';
import  Landing  from './pages/Landing';
import { HomeLayout } from './pages/HomeLayout';
import { action as signUpAction } from "./pages/SignUp";

import { loader as updateUserLoader } from "./pages/UpdateUser";

import ErrorElement from "./components/ErrorElement";
import AddUser  from './pages/AddUser';
import { UpdateUser } from './pages/UpdateUser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Demo from './pages/Demo';



const queryClient = new QueryClient();



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/adduser",
        element: <AddUser />,
      },
      {
        path: "/updateuser/:id",
        element: <UpdateUser />,
        loader: updateUserLoader,
      },
      {
        path: '/demo',
        element: <Demo />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    // action: loginAction,
  },
  {
    path: "/signup",
    element: <SignUp />,
    // action: signUpAction,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
