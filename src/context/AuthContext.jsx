import { createContext, useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import app from '../firebase/firebase.config';
import LoadingSpinner from '../components/LoadingSpinner';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, current => {
      setUser(current);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const register = async ({ name, email, password, photoURL }) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photoURL || null
    });
  };

  const googleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());

  if (loading) return <LoadingSpinner />;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
