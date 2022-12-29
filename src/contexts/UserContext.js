import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import app from '../firebase/firebaseConfig';

export const AuthContext = createContext(null);
const auth = getAuth(app);

export default function UserContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setTimeout(() => {
          setLoading(false);
        }, 250);
      } else {
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const createUserWithMailAndPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithMailAndPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const signInWithProvider = (provider) => {
    return signInWithPopup(auth, provider);
  };

  const logout = (code) => {
    signOut(auth)
      .then(() => {
        if (code) {
          toast.success('Logged out successfully');
        }
        setUser(null);
      })
      .catch((error) => {
        toast.error(error.message.replace('Firebase: ', ''));
      });
  };

  const value = {
    user,
    setUser,
    createUserWithMailAndPass,
    signInWithProvider,
    signInWithMailAndPass,
    loading,
    setLoading,
    updateUserProfile,
    logout,
    userRole,
    setUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
