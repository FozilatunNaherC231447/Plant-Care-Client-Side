import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AddPlant from '../pages/AddPlant';
import AllPlants from '../pages/AllPlants';
import PlantDetails from '../pages/PlantDetails';
import MyPlants from '../pages/MyPlants';
import UpdatePlant from '../pages/UpdatePlant';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/add-plant', element: <PrivateRoute><AddPlant /></PrivateRoute> },
      { path: '/all-plants', element: <AllPlants /> },
      { path: '/my-plants', element: <PrivateRoute><MyPlants /></PrivateRoute> },
      { path: '/plant/:id', element: <PrivateRoute><PlantDetails /></PrivateRoute> },
      { path: '/update-plant/:id', element: <PrivateRoute><UpdatePlant /></PrivateRoute> },
    ]
  }
]);