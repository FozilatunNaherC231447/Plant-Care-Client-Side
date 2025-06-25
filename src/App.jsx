import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddPlant from './pages/AddPlant';
import AllPlants from './pages/AllPlants';
import MyPlants from './pages/MyPlants';
import PlantDetails from './pages/PlantDetails';
import UpdatePlant from './pages/UpdatePlant';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { ThemeProvider } from './context/ThemeContext';


function App() {
  return (
    <div className="font-sans bg-green-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-plants" element={<AllPlants />} />
        <Route path="/add-plant" element={
          <PrivateRoute>
            <AddPlant />
          </PrivateRoute>
        } />
        <Route path="/my-plants" element={
          <PrivateRoute>
            <MyPlants />
          </PrivateRoute>
        } />
        <Route path="/plant/:id" element={
          <PrivateRoute>
            <PlantDetails />
          </PrivateRoute>
        } />
        <Route path="/update/:id" element={
          <PrivateRoute>
            <UpdatePlant />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer position="bottom-left" autoClose={3000} />
    </div>
  );
}

export default App;
