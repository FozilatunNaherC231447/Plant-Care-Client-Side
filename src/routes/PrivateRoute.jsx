import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
