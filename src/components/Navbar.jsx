
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { toast } from 'react-toastify';
import { HiMenu, HiX } from 'react-icons/hi';
import logo from '../assets/logo1.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className={`p-4 lg:px-20 lg:py-6 flex justify-between items-center relative ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-green-800 text-white'}`}>
      {/* Logo + Brand */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="PlantCare Logo" className="w-10 h-10 rounded-3xl" />
        <span className="text-2xl md:text-3xl font-bold">PlantCare</span>
      </Link>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-3xl absolute right-2" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } flex-col md:flex md:flex-row md:items-center md:space-x-6 text-lg absolute md:static top-20 right-5 md:w-auto bg-green-800 md:bg-transparent p-4 md:p-0 z-50`}
      >
        <Link to="/" onClick={() => setIsOpen(false)} className="py-1">Home</Link>
        <Link to="/all-plants" onClick={() => setIsOpen(false)} className="py-1">All Plants</Link>

        {user && (
          <>
            <Link to="/add-plant" onClick={() => setIsOpen(false)} className="py-1">Add Plant</Link>
            <Link to="/my-plants" onClick={() => setIsOpen(false)} className="py-1">My Plants</Link>
          </>
        )}

        {user ? (
          <>
            <div className="flex items-center space-x-2 group" title={user.displayName || user.email}>
              {user.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-white" />
              ) : (
                <span className="font-semibold">{user.email}</span>
              )}
              <span className="hidden group-hover:inline text-sm">{user.displayName}</span>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white mt-2 md:mt-0"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)} className="hover:underline py-1">Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)} className="hover:underline py-1">Register</Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
